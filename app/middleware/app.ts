/**
 * LinkedRenderStore app middleware
 */

import rdf, { createNS, NamedNode } from '@ontologies/core';
import rdfx from '@ontologies/rdf';
import schema from '@ontologies/schema';
import { MiddlewareActionHandler, MiddlewareWithBoundLRS } from 'link-lib';
import { LinkReduxLRSType } from 'link-redux';

import { getMetaContent } from '../helpers/arguHelpers';
import http from '../ontology/http';
import ll from '../ontology/ll';
import ontola from '../ontology/ontola';

export const website = getMetaContent('website-iri') || 'https://example.com';
export const frontendIRI = rdf.namedNode(website!);
export const frontendIRIStr = frontendIRI.value;
export const frontendPathname = new URL(frontendIRIStr).pathname;
export const frontendOrigin = new URL(frontendIRIStr).origin;

const app = createNS(frontendIRIStr.endsWith('/') ? frontendIRIStr : `${frontendIRIStr}/`);

export const appMiddleware = () => (store: LinkReduxLRSType): MiddlewareWithBoundLRS => {

  (store as any).actions.app = {};

  /**
   * App menu setup
   */

  store.processDelta([
      rdf.quad(app('menu'), rdfx.type, app('Menu')),
      rdf.quad(app('menu'), http.statusCode, rdf.literal(200), ll.meta),
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
          rdfx.type,
          app('AppSignIn'),
          ll.add,
      ),
      rdf.quad(
          resourceIRI,
          schema.name,
          rdf.literal('test'),
          ll.add,
      ),
    ], true);
  };

  createSignIn();

  (store as any).actions.app.startSignIn = (r?: NamedNode) => {
    const resourceIRI = signInLink(r);
    return createSignIn(r)
        .then(() => {
          (store as any).actions.ontola.showDialog(resourceIRI);
        });
  };

  /**
   * App sign out
   */
  (store as any).actions.app.startSignOut = (redirect?: NamedNode) => {
    if (redirect) {
      store.exec(ontola.ns(`actions/logout?location=${redirect.value}`));
    } else {
      store.exec(ontola.ns('actions/logout'));
    }
  };

  /**
   * Handler
   */
  return (next: MiddlewareActionHandler) => next;
};
