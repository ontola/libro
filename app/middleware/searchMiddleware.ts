import rdf, { Node } from '@ontologies/core';
import { createActionPair } from '@rdfdev/actions';
import HttpStatus from 'http-status-codes';
import {
  MiddlewareActionHandler,
  MiddlewareFn,
  MiddlewareWithBoundLRS,
  SomeNode,
} from 'link-lib';
import { LinkReduxLRSType } from 'link-redux';

import { quadruple } from '../modules/Kernel/lib/quadruple';
import app from '../modules/Common/ontology/app';
import ll from '../modules/Kernel/ontology/ll';
import http from '../ontology/http';
import ld from '../modules/Kernel/ontology/ld';

interface SearchActionMap {
  target: Node
}

export const searchMiddleware = (): MiddlewareFn<React.ComponentType<any>> => (store: LinkReduxLRSType): MiddlewareWithBoundLRS => {
  (store as any).actions.search = {};

  store.processDelta([
    quadruple(app['individuals/searchTarget'], http.statusCode, rdf.literal(HttpStatus.OK), ll.meta),
  ], true);

  const { dispatch, parse } = createActionPair<SearchActionMap>(app.ns, store);

  (store as any).actions.search.setTarget = (target: Node) => dispatch('setTarget', {
    target,
  });

  return (next: MiddlewareActionHandler) => (iri: SomeNode, opts: any): Promise<any> => {
    const { base, params: { target } } = parse(iri);

    switch (base) {
    case app.ns('setTarget'): {

      const delta = [
        quadruple(app['individuals/searchTarget'], app.target, target!, ld.replace),
      ];

      return store.processDelta(delta, true);
    }

    default:
    }

    return next(iri, opts);
  };

};
