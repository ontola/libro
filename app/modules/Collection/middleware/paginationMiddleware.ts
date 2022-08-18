import { Node, Quadruple } from '@ontologies/core';
import { createActionPair } from '@rdfdev/actions';
import {
  MiddlewareActionHandler,
  MiddlewareFn,
  MiddlewareWithBoundLRS,
  SomeNode, 
} from 'link-lib';
import { LinkReduxLRSType } from 'link-redux';
import type React from 'react';

import app from '../../Common/ontology/app';
import ontola from '../../Kernel/ontology/ontola';

import { ChangePage } from './actions';

interface PaginationAction {
  newPage: Node;
  subject: Node;
}

export const paginationMiddleware = (): MiddlewareFn<React.ComponentType<any>> => (store: LinkReduxLRSType): MiddlewareWithBoundLRS => {
  const { dispatch, parse } = createActionPair<PaginationAction>(app.ns, store);

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
