/**
 * LinkedRenderStore app middleware
 */

import rdf, { createNS, NamedNode } from '@ontologies/core';
import { MiddlewareActionHandler, MiddlewareWithBoundLRS } from 'link-lib';
import { LinkReduxLRSType } from 'link-redux';

import { getMetaContent } from '../helpers/arguHelpers';

export const website = getMetaContent('website-iri') || 'https://example.com';
export const frontendIRI = rdf.namedNode(website!);
export const frontendIRIStr = frontendIRI.value;
export const frontendPathname = new URL(frontendIRIStr).pathname;
export const frontendOrigin = new URL(frontendIRIStr).origin;

const app = createNS(frontendIRIStr.endsWith('/') ? frontendIRIStr : `${frontendIRIStr}/`);
const appSlashless = createNS(frontendIRIStr.slice(0, frontendIRIStr.endsWith('/') ? -1 : undefined));

export const appMiddleware = () => (store: LinkReduxLRSType): MiddlewareWithBoundLRS => {

  (store as any).actions.app = {};

  // eslint-disable-next-line no-param-reassign
  store.namespaces.app = app;
  // eslint-disable-next-line no-param-reassign
  store.namespaces.appSlashless = appSlashless;

  /**
   * App menu setup
   */

  store.processDelta([
      rdf.quad(app('menu'), store.namespaces.rdf('type'), app('Menu')),
  ], true);

  /**
   * App sign in
   */
  const signInLink = (r?: NamedNode) => {
    const postFix = r ? `?r=${encodeURIComponent(r.value)}` : '';
    return app('u/sign_in' + postFix);
  };

  const createSignIn = (r?: NamedNode) => {
    const resourceIRI = signInLink(r);

    return store.processDelta([
      rdf.quad(
          resourceIRI,
          store.namespaces.rdf('type'),
          app('AppSignIn'),
          store.namespaces.ll('add'),
      ),
      rdf.quad(
          resourceIRI,
          store.namespaces.schema('name'),
          rdf.literal('test'),
          store.namespaces.ll('add'),
      ),
    ], true);
  };

  createSignIn();

  (store as any).actions.app.startSignIn = (r?: NamedNode) => {
    const resourceIRI = signInLink(r);
    createSignIn(r)
        .then(() => {
          (store as any).actions.ontola.showDialog(resourceIRI);
        });
  };

  /**
   * App sign out
   */
  (store as any).actions.app.startSignOut = (redirect?: NamedNode) => {
    if (redirect) {
      store.exec(store.namespaces.ontola(`actions/logout?location=${redirect.value}`));
    } else {
      store.exec(store.namespaces.ontola('actions/logout'));
    }
  };

  /**
   * Handler
   */
  return (next: MiddlewareActionHandler) => next;
};
