import { BlankNode, Literal, NamedNode } from '@ontologies/core';
import xsd from '@ontologies/xsd';

export const isDate = (prop: any) => (
  isLiteral(prop) && prop.datatype === xsd.date
);

export const isDateTime = (prop: any) => (
  isLiteral(prop) && prop.datatype === xsd.dateTime
);

export const isDateOrDateTime = (prop: any) => (
  isDate(prop) || isDateTime(prop)
);

export const isPromise = (obj: any): obj is Promise<any> => (
  typeof obj?.then === 'function'
);

export const isResource = (obj: any): obj is NamedNode | BlankNode => (
  ['NamedNode', 'BlankNode'].includes(obj?.termType)
);

export const isLiteral = (obj: any): obj is Literal => (
  ['Literal'].includes(obj?.termType)
);
