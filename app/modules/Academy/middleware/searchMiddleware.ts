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
import type React from 'react';

import { quadruple } from '../../Kernel/lib/quadruple';
import app from '../../Common/ontology/app';
import ll from '../../Kernel/ontology/ll';
import http from '../../../ontology/http';
import ld from '../../Kernel/ontology/ld';

import { SetSearchTarget } from './actions';

interface SearchActionMap {
  target: Node
}

export const searchMiddleware = (): MiddlewareFn<React.ComponentType<any>> => (store: LinkReduxLRSType): MiddlewareWithBoundLRS => {
  store.processDelta([
    quadruple(app['individuals/searchTarget'], http.statusCode, rdf.literal(HttpStatus.OK), ll.meta),
  ], true);

  const { dispatch, parse } = createActionPair<SearchActionMap>(app.ns, store);

  store.actions.set(
    SetSearchTarget,
    (target: Node) => dispatch('setTarget', {
      target,
    }),
  );

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
