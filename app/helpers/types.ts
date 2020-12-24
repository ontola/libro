import { BlankNode, Literal, NamedNode } from '@ontologies/core';
import xsd from '@ontologies/xsd';
import { JSONLDObject } from './forms';

export const isDate = (prop: any) => (
  isLiteral(prop) && prop.datatype === xsd.date
);

export const isDateTime = (prop: any) => (
  isLiteral(prop) && prop.datatype === xsd.dateTime
);

export const isDateOrDateTime = (prop: any) => (
  isDate(prop) || isDateTime(prop)
);

export const isFunction = (value: any): value is ((...props: any) => any) => typeof value === 'function';

export const isJSONLDObject = (value: any): value is JSONLDObject => (
  Object.prototype.hasOwnProperty.call(value, '@id')
);

export const isNumber = (value: any): value is number => typeof value === 'number';

export const isPromise = (obj: any): obj is Promise<any> => (
  isFunction(obj?.then)
);

export const isResource = (obj: any): obj is NamedNode | BlankNode => (
  ['NamedNode', 'BlankNode'].includes(obj?.termType)
);

export const isLiteral = (obj: any): obj is Literal => (
  ['Literal'].includes(obj?.termType)
);
