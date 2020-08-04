/**
 * LinkedRenderStore app middleware
 */

import rdf, { NamedNode, Node, Quadruple, SomeTerm } from '@ontologies/core';
import rdfx from '@ontologies/rdf';
import { createActionPair } from '@rdfdev/actions';
import { MiddlewareActionHandler, MiddlewareWithBoundLRS } from 'link-lib';
import { LinkReduxLRSType } from 'link-redux';
import app from '../ontology/app';
import http from '../ontology/http';
import libro from '../ontology/libro';
import ll from '../ontology/ll';
import ontola from '../ontology/ontola';
import sp from '../ontology/sp';

const pageRenderBase = (subject: SomeTerm, baseCollection: SomeTerm, collectionDisplay: SomeTerm): NamedNode => {
  const subjParams = new URL(subject.value).searchParams;
  if (!subjParams.get('display')) {
    return subject as NamedNode;
  }

  const renderBase = new URL(baseCollection.value);
  renderBase.searchParams.set(
    'display',
    collectionDisplay.value.replace('https://ns.ontola.io/core#collectionDisplay/', ''),
  );
  if (subjParams.get('type')) {
    renderBase.searchParams.set('type', subjParams.get('type')!);
  }
  if (subjParams.get('page_size')) {
    renderBase.searchParams.set('page_size', subjParams.get('page_size')!);
  }

  return rdf.namedNode(renderBase.toString());
};

interface AppActionMap {
  newPage: Node;
  subject: Node;
}

export const appMiddleware = () => (store: LinkReduxLRSType): MiddlewareWithBoundLRS => {

  (store as any).actions.app = {};

  const { dispatch, parse } = createActionPair<AppActionMap>(app.ns, store);

  /**
   * App menu setup
   */

  store.processDelta([
      rdf.quad(app.menu, rdfx.type, app.Menu),
      rdf.quad(app.menu, http.statusCode, rdf.literal(200), ll.meta),
  ], true);

  /**
   * App sign in
   */
  const signInLink = (r?: NamedNode) => {
    const postFix = r ? `?r=${encodeURIComponent(r.value.split('#')[0])}` : '';
    return app.ns('u/sign_in' + postFix);
  };

  (store as any).actions.app.startSignIn = (r?: NamedNode) => {
    const resourceIRI = signInLink(r);
    return (store as any).actions.ontola.showDialog(resourceIRI);
  };

  /**
   * App sign out
   */
  (store as any).actions.app.startSignOut = (redirect?: NamedNode) => {
    if (redirect) {
      store.exec(rdf.namedNode(`${libro.actions.logout.value}?location=${encodeURIComponent(redirect.value)}`));
    } else {
      store.exec(libro.actions.logout);
    }
  };

  /**
   * Collections
   */
  (store as any).actions.app.changePage = (subject: Node, newPage: Node) => dispatch(
    'changePage',
    { subject, newPage },
  );

  /**
   * Handler
   */
  return (next: MiddlewareActionHandler) => (iri: NamedNode, opts: any): Promise<any> => {
    const { base, params: { newPage, subject } } = parse(iri);

    switch (base) {
      case app.ns('changePage'): {
        const baseCollection = store.getResourceProperty<NamedNode>(subject!, ontola.baseCollection)!;
        const collectionDisplay = store.getResourceProperty<NamedNode>(subject!, ontola.collectionDisplay)!;
        const renderBase = pageRenderBase(subject!, baseCollection, collectionDisplay);
        const delta: Quadruple[] = newPage && newPage !== renderBase
          ? [[renderBase, app.currentPage, newPage, ontola.replace]]
          : [[renderBase, app.currentPage, sp.Variable, ontola.remove]];

        return store.processDelta(delta, true);
      }
      default:
    }

    return next(iri, opts);
  };
};
