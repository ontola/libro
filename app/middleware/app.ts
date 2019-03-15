/**
 * LinkedRenderStore app middleware
 */

import { MiddlewareActionHandler, MiddlewareWithBoundLRS } from 'link-lib';
import { LinkReduxLRSType } from 'link-redux';
import { NamedNode, Namespace, Statement } from 'rdflib';

import { getMetaContent } from '../helpers/arguHelpers';
import { purgeCollection } from '../helpers/monkeys';

export const website = getMetaContent('website-iri');
export const frontendIRI = NamedNode.find(website!);
export const frontendIRIStr = frontendIRI.value;
export const frontendPathname = new URL(frontendIRIStr).pathname;
export const frontendOrigin = new URL(frontendIRIStr).origin;

const app = Namespace(frontendIRIStr.endsWith('/') ? frontendIRIStr : `${frontendIRIStr}/`);
const appSlashless = Namespace(frontendIRIStr.slice(0, frontendIRIStr.endsWith('/') ? -1 : undefined));

export const menuStates = {
  closed: app('menu/openState/closed'),
  closing: app('menu/openState/closing'),
  open: app('menu/openState/open'),
};

export const appMiddleware = () => (store: LinkReduxLRSType): MiddlewareWithBoundLRS => {
  // eslint-disable-next-line no-param-reassign
  store.namespaces.app = app;
  // eslint-disable-next-line no-param-reassign
  store.namespaces.appSlashless = appSlashless;

  /**
   * App menu setup
   */

  store.processDelta([
      new Statement(app('menu'), store.namespaces.rdf('type'), app('Menu')),
      new Statement(app('menu'), app('openState'), menuStates.closed),
  ], true);

  const changeMenu = (state: NamedNode) => [
      new Statement(
        app('menu'),
        app('openState'),
        state,
        store.namespaces.ll('replace'),
      ),
  ];

  return (next: MiddlewareActionHandler) => (iri: NamedNode, opts: any): Promise<any> => {

    if ([
        store.namespaces.ontola(`actions/navigation/push`),
        store.namespaces.ontola(`actions/navigation/pop`),
    ].includes(iri)) {
      const nextState = store.getResourceProperty(app('menu'), app('openState')) === menuStates.open
          ? menuStates.closing
          : menuStates.closed;
      store.processDelta(changeMenu(nextState), true);
    }

    if (iri.value.startsWith(app('').value)) {
      const actionKey = `app.storedActions.${iri.value}`;
      const storedAction = sessionStorage.getItem(actionKey);
      if (storedAction && opts) {
          // The action came from a form, so the stored data is probably stale.
          sessionStorage.removeItem(actionKey);
      } else if (storedAction) {
        const parsedAction = storedAction && JSON.parse(storedAction);
        const action = NamedNode.find(parsedAction.action.value);
        return store
            .execActionByIRI(action, parsedAction.formData)
            .then(() => {
              purgeCollection(store, action);
              sessionStorage.removeItem(actionKey);
            });
      }
    }

    switch (iri) {
      case app('actions/menu/open'):
        return store.processDelta(changeMenu(menuStates.open), true);
      case app('actions/menu/close'):
        return store.processDelta(changeMenu(menuStates.closing), true);
      case app('actions/menu/closed'):
        return store.processDelta(changeMenu(menuStates.closed), true);
      default:
    }

    return next(iri, opts);
  };
};
