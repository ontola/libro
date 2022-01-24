import rdf from '@ontologies/core';
import { DataRecord } from 'link-lib';

export interface Value {
  type: 'id' | 'lid' | 'p' | 'ls'
  v: string;
}

export interface GlobalId {
  type: 'id';
  v: string;
}

export interface LocalId {
  type: 'lid';
  v: string;
}

export interface Primitive {
  type: 'p';
  v: string;
  dt: string;
}

export interface LangString {
  type: 'ls';
  l: string;
  v: string;
}

const valueToStoreValue = (v: Value) => {
  switch (v.type) {
  case 'id': return rdf.namedNode(v.v);
  case 'lid': return rdf.blankNode(v.v);
  case 'p': return rdf.literal(v.v, rdf.namedNode((v as Primitive).dt));
  case 'ls': return rdf.literal(v.v, (v as LangString).l);
  }
};

export const seedToSlice = (initialData: string | undefined): Record<string, DataRecord> => {
  if (initialData === undefined) {
    return {};
  }

  return JSON.parse(initialData, (key, value) => {
    if (key === '_id') {
      return valueToStoreValue(value);
    }

    if (!Array.isArray(value)) {
      return value;
    }

    if (value.length === 1) {
      return valueToStoreValue(value[0]);
    }

    return value.map(valueToStoreValue);
  });
};
