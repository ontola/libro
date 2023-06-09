import rdf, { NamedNode, SomeTerm } from '@ontologies/core';
import { SomeNode } from 'link-lib';

import { handle } from '../../../helpers/logging';
import { calculateFormFieldName } from '../../Form/lib/helpers';

export const serializeForStorage = (value: SomeTerm[]): string => JSON.stringify(value);

export const parseBoolean = (val: string | null): boolean => val === 'true';

export const parseValue = (plain: Record<string, any> | any): SomeTerm => {
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
    return plain.value ? rdf.literal(plain.value) : rdf.literal(plain);
  }
};

export const parseForStorage = (valueFromStorage: string | null): SomeTerm[] | undefined => {
  if (!valueFromStorage) {
    return undefined;
  }

  try {
    const plain = JSON.parse(valueFromStorage);

    if (Array.isArray(plain)) {
      return plain.map(parseValue);
    }

    return [parseValue(plain)];
  } catch (e) {
    handle(e);

    return undefined;
  }
};

export const getStorageKey = (formContext: string, object?: SomeNode, path?: NamedNode): string => (
  calculateFormFieldName(formContext, object, path)
);

export const storageGet = (sessionStore: Storage | undefined, key: string): SomeTerm[] | undefined => (
  __CLIENT__ ? parseForStorage((sessionStore || sessionStorage).getItem(key)) : undefined
);

export const storageSet = (sessionStore: Storage | undefined, key: string, newValue: SomeTerm[]): void => {
  if (__CLIENT__ && typeof newValue !== 'undefined') {
    (sessionStore || sessionStorage).setItem(key, serializeForStorage(newValue));
  }
};

export const inputValueFromStorage = (
  sessionStore: Storage | undefined,
  path: NamedNode,
  object: SomeNode | undefined,
  formID: string,
  nested: boolean,
): SomeTerm[] | undefined => {
  const storageKey = getStorageKey(formID, nested ? object : undefined, path);

  return storageGet(sessionStore, storageKey);
};
