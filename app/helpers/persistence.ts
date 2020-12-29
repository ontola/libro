import rdf, {NamedNode, SomeTerm} from '@ontologies/core';
import { SomeNode } from 'link-lib';
import { calculateFormFieldName } from './forms';
import { handle } from './logging';

export const serializeForStorage = (value: SomeTerm | string ): string => {
  return JSON.stringify(value);
};

const parsedValue = (plain: any) => {
  switch (plain.termType) {
    case 'NamedNode':
      return rdf.namedNode(plain.value);
    case 'BlankNode':
      return rdf.blankNode(plain.value);
    case 'Literal': {
      const datatype = plain.datatype ? rdf.namedNode(plain.datatype.value) : undefined;

      return rdf.literal(plain.value, plain.language || datatype);
    }
    default:
      return plain.value ? rdf.literal(plain.value) : plain;
  }
};

export const parseForStorage = (valueFromStorage: string | null): any  => {
  if (!valueFromStorage) {
    return undefined;
  }

  try {
    const plain = JSON.parse(valueFromStorage);
    if (Array.isArray(plain)) {
      return plain.map(parsedValue);
    }

    return parsedValue(plain);
  } catch (e) {
    handle(e);

    return undefined;
  }
};

export const getStorageKey = (formContext: string, object?: SomeNode, path?: NamedNode) => (
    calculateFormFieldName(formContext, object, path)
);

export const storageGet = (sessionStore: Storage | undefined, key: string) => (
    __CLIENT__ ? parseForStorage((sessionStore || sessionStorage).getItem(key)) : undefined
);

export const storageSet = (sessionStore: Storage | undefined, key: string, newValue: any) => {
  if (__CLIENT__ && typeof newValue !== 'undefined') {
    (sessionStore || sessionStorage).setItem(key, serializeForStorage(newValue));
  }
};
