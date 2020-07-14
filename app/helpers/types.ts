import { BlankNode, NamedNode } from '@ontologies/core';

export const isPromise = (obj: any): obj is Promise<any> => (
  typeof obj?.then === 'function'
);

export const isResource = (obj: any): obj is NamedNode | BlankNode => (
  ['NamedNode', 'BlankNode'].includes(obj.termType)
);
