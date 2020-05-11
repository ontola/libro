import rdf, {NamedNode, SomeTerm} from '@ontologies/core';
import { calculateFormFieldName } from '../helpers/forms';
import { handle } from '../helpers/logging';

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

export const usePersistence = (
    storage: Storage,
    storageKey: string,
): [unknown, (v: any) => void] => {

  if (!storage) {
    return [undefined, () => undefined];
  }
  const setValue = (newValue: any) => {
    if (typeof newValue !== 'undefined') {
      storage.setItem(storageKey, serializeForStorage(newValue));
    }
  };

  const valueFromStorage = storage.getItem(storageKey);

  if (valueFromStorage === null) {
    return [undefined, setValue];
  }

  const value = parseForStorage(valueFromStorage);

  return [value, setValue];
};
