/**
 * LinkedRenderStore app middleware
 */

import rdf, {
  NamedNode,
  Node,
  Quadruple,
} from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
import { createActionPair } from '@rdfdev/actions';
import HttpStatus from 'http-status-codes';
import {
  MiddlewareActionHandler,
  MiddlewareWithBoundLRS,
  SomeNode,
} from 'link-lib';
import { LinkReduxLRSType } from 'link-redux';

import { DialogSize } from '../modules/Common/lib/DialogSize';
import { ShowDialog } from '../modules/Common/middleware/actions';
import { quadruple } from '../modules/Kernel/lib/quadruple';
import app from '../modules/Common/ontology/app';
import libro from '../modules/Kernel/ontology/libro';
import ll from '../modules/Kernel/ontology/ll';
import ontola from '../modules/Kernel/ontology/ontola';
import http from '../ontology/http';

import {
  ChangePage,
  StartSignIn,
  StartSignOut,
} from './actions';

interface AppActionMap {
  newPage: Node;
  subject: Node;
}

export const appMiddleware = () => (store: LinkReduxLRSType): MiddlewareWithBoundLRS => {
  const { dispatch, parse } = createActionPair<AppActionMap>(app.ns, store);

  /**
   * App menu setup
   */

  store.processDelta([
    quadruple(app.menu, rdfx.type, app.Menu),
    quadruple(app.menu, http.statusCode, rdf.literal(HttpStatus.OK), ll.meta),
  ], true);

  /**
   * App sign in
   */
  const signInLink = (redirectUrl?: NamedNode) => {
    const postFix = redirectUrl ? `?redirect_url=${encodeURIComponent(redirectUrl.value.split('#')[0])}` : '';

    return app.ns('u/session/new' + postFix);
  };

  store.actions.set(
    StartSignIn,
    (redirectUrl?: NamedNode) => {
      const resourceIRI = signInLink(redirectUrl);

      return store.actions.get(ShowDialog)(resourceIRI, DialogSize.Sm);
    },
  );

  /**
   * App sign out
   */
  store.actions.set(
    StartSignOut,
    (redirect?: NamedNode) => {
      if (redirect) {
        store.exec(rdf.namedNode(`${libro.actions.logout.value}?location=${encodeURIComponent(redirect.value)}`));
      } else {
        store.exec(libro.actions.logout);
      }
    },
  );

  /**
   * Collections
   */
  store.actions.set(
    ChangePage,
    (subject: Node, newPage: Node) => dispatch(
      'changePage',
      {
        newPage,
        subject,
      },
    ),
  );

  /**
   * Handler
   */
  return (next: MiddlewareActionHandler) => (iri: SomeNode, opts: any): Promise<any> => {
    const { base, params: { newPage, subject } } = parse(iri);

    switch (base) {
    case app.ns('changePage'): {
      const delta: Quadruple[] = [[subject!, app.collectionResource, newPage!, ontola.replace]];

      return store.processDelta(delta, true);
    }

    default:
    }

    return next(iri, opts);
  };
};
