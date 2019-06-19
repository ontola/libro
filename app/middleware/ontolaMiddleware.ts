import clipboardCopy from 'clipboard-copy';
import { History } from 'history';
import {
  MiddlewareActionHandler,
  MiddlewareFn,
  MiddlewareWithBoundLRS,
  transformers,
} from 'link-lib';
import { LinkReduxLRSType } from 'link-redux';
import {
  BlankNode,
  Collection,
  Literal,
  NamedNode,
  Namespace,
  Statement,
} from 'rdflib';
import { ReactType } from 'react';
import { defineMessages } from 'react-intl';

import { safeCredentials } from '../helpers/arguHelpers';
import { retrievePath } from '../helpers/iris';
import { handle } from '../helpers/logging';
import ServiceWorkerCommunicator from '../helpers/ServiceWorkerCommunicator';
import { redirectPage, reloadPage } from './reloading';

const messages = defineMessages({
  copyFinished: {
    defaultMessage: 'Copied...',
    description: 'The (inline) message to indicate the value was copied to their clipboard',
    id: 'https://ns.ontola.io/actions/copyToClipboard/copySuccessMessage',
  },
});

const ontolaMiddleware = (history: History, serviceWorkerCommunicator: ServiceWorkerCommunicator):
    MiddlewareFn<ReactType> => (store: LinkReduxLRSType): MiddlewareWithBoundLRS => {

  (store as any).actions.ontola = {};

  const ontola = Namespace('https://ns.ontola.io/');
  // eslint-disable-next-line no-param-reassign
  store.namespaces.ontola = ontola;

  const ontolaActionPrefix = store.namespaces.ontola('actions/').value;

  const currentPath = (): string => {
    const l = history.location;
    return [
      [l.pathname, l.search].filter(Boolean).join(''),
      l.hash,
    ].filter(Boolean).join('#');
  };

  /**
   * Websockets
   */

  const ontolaWebsocketsPrefix = store.namespaces.ontola('ws/').value;
  const deltaTransformer = transformers.linkedDeltaProcessor(store);

  /**
   * Ontola snackbar setup
   */

  const snackbarQueue = new Collection();

  store.processDelta([
    new Statement(
      ontola('snackbar/manager'),
      store.namespaces.rdf('type'),
      ontola('snackbar/Manager'),
      store.namespaces.ll('add'),
    ),
    new Statement(
      ontola('snackbar/manager'),
      ontola('snackbar/queue'),
      snackbarQueue,
      store.namespaces.ll('add'),
    ),
  ], true);

  const queueSnackbar = (text: string) => {
    const s = new BlankNode();

    const queue = store.getResourceProperty(ontola('snackbar/manager'), ontola('snackbar/queue'));

    return [
      new Statement(
        s,
        store.namespaces.rdf('type'),
        ontola('snackbar/Snackbar'),
        store.namespaces.ll('add'),
      ),
      new Statement(
        s,
        store.namespaces.schema('text'),
        Literal.fromValue(text),
        store.namespaces.ll('add'),
      ),
      new Statement(
        ontola('snackbar/manager'),
        ontola('snackbar/queue'),
        // @ts-ignore
        Collection.fromValue([...queue.elements, s]),
        store.namespaces.ll('replace'),
      ),
    ];
  };

  const shiftSnackbar = () => {
    const queue = store.getResourceProperty(ontola('snackbar/manager'), ontola('snackbar/queue')) as Collection;
    queue.shift();

    return [
      new Statement(
          ontola('snackbar/manager'),
          ontola('snackbar/queue'),
          // @ts-ignore
          Collection.fromValue(queue.elements),
          store.namespaces.ll('replace'),
      ),
    ];
  };

  /**
   * Ontola dialog setup
   */

  const dialogManager = ontola('dialog/manager');

  store.processDelta([
    new Statement(
      dialogManager,
      store.namespaces.rdf('type'),
      ontola('dialog/Manager'),
      store.namespaces.ll('add'),
    ),
  ], true);

  const hideDialog = () => [
    new Statement(
      dialogManager,
      ontola('dialog/resource'),
      ontola('dialog/rm'),
      store.namespaces.ll('remove'),
    ),
  ];

  const showDialog = (value: string) => [
    new Statement(
      dialogManager,
      ontola('dialog/resource'),
      NamedNode.find(value),
      store.namespaces.ll('replace'),
    ),
    new Statement(
      dialogManager,
      ontola('dialog/opener'),
      store.namespaces.app(currentPath().slice(1)),
      store.namespaces.ll('replace'),
    ),
  ];

  (store as any).actions.ontola.showDialog = (resource: NamedNode) => {
    store.exec(store.namespaces.ontola(`actions/dialog/alert?resource=${encodeURIComponent(resource.value)}`));
  };

  (store as any).actions.ontola.navigate = (resource: NamedNode) => {
    store.exec(store.namespaces.ontola(`actions/dialog/redirect?location=${encodeURIComponent(resource.value)}`));
  };

  /**
   * Miscellaneous
   */

  history.listen((_, action) => {
    if (['POP', 'PUSH'].includes(action)) {
      store.exec(ontola(`actions/navigation/${action.toLowerCase()}`));
    }
  });

  return (next: MiddlewareActionHandler) => (iri: NamedNode, opts: any): Promise<any> => {
    const isWSAction = iri.value.startsWith(ontolaWebsocketsPrefix);

    if (!iri.value.startsWith(ontolaActionPrefix) && !isWSAction) {
      return next(iri, opts);
    }

    if (isWSAction) {
      if (iri.value.startsWith(`${ontolaWebsocketsPrefix}received`)) {
        return deltaTransformer(new Response(opts));
      }

      return Promise.resolve();
    }

    switch (iri) {
      case store.namespaces.ontola('actions/logout'):
        return fetch(store.namespaces.app('logout').value, safeCredentials({
          method: 'POST',
        }))
          .then(() => {
            try {
              serviceWorkerCommunicator.clearCache();
            } catch (e) {
              handle(e);
            }
            reloadPage(false);
          }, () => {
            handle(new Error('User logout action failed'));
          });
      case store.namespaces.ontola('actions/refresh'):
        if (__CLIENT__) {
          reloadPage(false);
        }
        return Promise.resolve();
      case store.namespaces.ontola('actions/reload'):
        reloadPage(true);
        return Promise.resolve();
      case ontola(`actions/navigation/push`):
      case ontola(`actions/navigation/pop`):
        const dialog = store.getResourceProperty(dialogManager, ontola('dialog/resource'));
        if (dialog) {
          store.exec(ontola('actions/dialog/close'));
        }
        return next(iri, opts);
      default:
    }

    if (iri.value.startsWith(store.namespaces.ontola('actions/copyToClipboard').value)) {
      const value = new URL(iri.value).searchParams.get('value');

      if (!value) {
        throw new Error("Argument 'value' was missing.");
      }

      return clipboardCopy(value)
        .then(() => Promise.resolve((store as any).intl.formatMessage(messages.copyFinished)));
    }

    if (iri.value.startsWith(store.namespaces.ontola('actions/redirect').value)) {
      const value = new URL(iri.value).searchParams.get('location');
      const reload = new URL(iri.value).searchParams.get('reload');

      if (!value) {
        throw new Error('No redirect path was given in action');
      }

      const location = new URL(value, window.location.origin).toString();

      if (reload && __CLIENT__) {
        redirectPage(location);
      } else {
        // TODO: connect to router
        history.push(retrievePath(location));
      }
      return Promise.resolve();
    }

    if (iri === store.namespaces.ontola('actions/dialog/close')) {
      store.processDelta(hideDialog(), true);
      return Promise.resolve();
    }

    if (iri.value.startsWith(store.namespaces.ontola('actions/dialog/alert').value)) {
      const resource = new URL(iri.value).searchParams.get('resource');

      history.push(currentPath());
      if (!resource) {
          throw new Error("Argument 'value' was missing.");
      }
      store.processDelta(showDialog(resource), true);

      return Promise.resolve();
    }

    if (iri.value.startsWith(store.namespaces.ontola('actions/snackbar/finished').value)) {
      store.processDelta(shiftSnackbar(), true);
      return Promise.resolve();
    }

    if (iri.value.startsWith(store.namespaces.ontola('actions/snackbar').value)) {
      const value = new URL(iri.value).searchParams.get('text');
      if (!value) {
          throw new Error("Argument 'value' was missing.");
      }
      store.processDelta(queueSnackbar(value), true);

      return Promise.resolve();
    }

    return next(iri, opts);
  };
};

export default ontolaMiddleware;
