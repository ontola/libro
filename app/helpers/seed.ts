import rdf, { Quad } from '@ontologies/core';
import { DataRecord, normalizeType } from 'link-lib';

export interface Value {
  type: 'id' | 'lid' | 'p' | 'ls';
  v: string;
}

export interface GlobalId extends Value {
  type: 'id';
  v: string;
}

export interface LocalId extends Value {
  type: 'lid';
  v: string;
}

export interface Primitive extends Value {
  type: 'p';
  v: string;
  dt: string;
}

export interface LangString extends Value {
  type: 'ls';
  v: string;
  l: string;
}

export type Identifyable = { _id: GlobalId | LocalId };
export type Fields = Record<string, Value[]>;

export type SeedDataRecord = Identifyable & Fields;

export type Seed = Record<string, SeedDataRecord>;

export type Slice = Record<string, DataRecord>;

const valueToStoreValue = (v: Value) => {
  switch (v.type) {
  case 'id': return rdf.namedNode(v.v);
  case 'lid': return rdf.blankNode(v.v);
  case 'p': return rdf.literal(v.v, rdf.namedNode((v as Primitive).dt));
  case 'ls': return rdf.literal(v.v, (v as LangString).l);
  }
};

export const seedToSlice = (initialData: string | undefined): Slice => {
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

export const sliceToQuads = (slice: Slice): Quad[] => Object.values(slice).reduce((acc: Quad[], obj: DataRecord) => {
  const resourceQuads: Quad[] = [];

  Object.entries(obj).forEach(([predicate, v]) => {
    normalizeType(v).forEach((value) => {
      resourceQuads.push(rdf.quad(
        obj._id,
        rdf.namedNode(predicate),
        value,
      ));
    });
  });

  return [...acc, ...resourceQuads];
}, []);
