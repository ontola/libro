import {
  BlankNode,
  Literal,
  NamedNode,
} from '@ontologies/core';
import * as xsd from '@ontologies/xsd';

export const isDate = (prop: unknown): boolean => (
  isLiteral(prop) && prop.datatype === xsd.date
);

export const isDateTime = (prop: unknown): boolean => (
  isLiteral(prop) && prop.datatype === xsd.dateTime
);

export const isDateOrDateTime = (prop: unknown): boolean => (
  isDate(prop) || isDateTime(prop)
);

export const isFunction = (value: unknown): value is ((...props: any) => any) => typeof value === 'function';

export const isNumber = (value: unknown): value is number => typeof value === 'number';

export const isPromise = (obj: unknown): obj is Promise<any> => (
  isFunction((obj as Record<string, unknown>)?.then)
);

export const isResource = (obj: unknown): obj is NamedNode | BlankNode => (
  ['NamedNode', 'BlankNode'].includes((obj as Record<string, unknown>)?.termType as string)
);

export const isString = (value: unknown): value is string => typeof value === 'string';

export const isLiteral = (obj: unknown): obj is Literal => (
  ['Literal'].includes((obj as Record<string, unknown>)?.termType as string)
);
