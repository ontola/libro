import rdf, { Quad, SomeTerm } from '@ontologies/core';
import * as xsd from '@ontologies/xsd';
import { DataRecord, normalizeType } from 'link-lib';

import { appendPath, normalizeTrailingSlash } from '../../Kernel/lib/id';

export interface Value {
  type: 'id' | 'lid' | 'p' | 's' | 'dt' | 'b' | 'i' | 'l' | 'ls';
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

export interface EmpString extends Value {
  type: 's';
  v: string;
}

export interface EmpBoolean extends Value {
  type: 'b';
  v: string;
}

export interface Int extends Value {
  type: 'i';
  v: string;
}

export interface Long extends Value {
  type: 'l';
  v: string;
}

export interface DateTime extends Value {
  type: 'dt';
  v: string;
}

export interface LangString extends Value {
  type: 'ls';
  v: string;
  l: string;
}

export type Identifyable = { _id: GlobalId | LocalId };
export type Fields = Record<string, Value | Value[]>;

export type SeedDataRecord = Identifyable & Fields;

export type Seed = Record<string, SeedDataRecord>;

export type DeepSeedFieldValue = Value | Value[] | DeepSeedDataRecord | DeepSeedDataRecord[];

export type DeepSeedFields = { [field: string]: DeepSeedFieldValue };

export type DeepSeedDataRecord = Identifyable & DeepSeedFields;

export type DeepSeed = Record<string, DeepSeedDataRecord>;

export type Slice = Record<string, DataRecord>;

const dataTypes = ['id', 'lid', 'p', 's', 'dt', 'b', 'i', 'l', 'ls'];

export const valueToStoreValue = (v: Value, websiteIRI: string, mapping: Record<string, string>): SomeTerm => {
  switch (v.type) {
  case 'id': {
    if (v.v === '/') {
      return rdf.namedNode(websiteIRI);
    }

    if (v.v.startsWith('/') || v.v.startsWith('#')) {
      return rdf.namedNode(appendPath(websiteIRI, v.v));
    }

    return rdf.namedNode(mapping[v.v] ? mapping[v.v] : v.v);
  }

  case 'lid': return rdf.blankNode(v.v);
  case 'p': return rdf.literal(v.v, rdf.namedNode((v as Primitive).dt));
  case 'ls': return rdf.literal(v.v, (v as LangString).l);
  case 's': return rdf.literal(v.v, xsd.string);
  case 'b': return rdf.literal(v.v, xsd.xsdboolean);
  case 'i': return rdf.literal(v.v, xsd.integer);
  case 'l': return rdf.literal(v.v, xsd.xsdlong);
  case 'dt': return rdf.literal(v.v, xsd.dateTime);
  }
};

export const isValue = (value: unknown): value is Value => !Array.isArray(value)
  && Object.hasOwnProperty.call(value, 'type')
  && dataTypes.includes((value as Value).type);

export const getValue = <T>(value: T, websiteIRI: string, mapping: Record<string, string>): SomeTerm | T => {
  if (isValue(value)) {
    return valueToStoreValue(value, websiteIRI, mapping);
  }

  if (Array.isArray(value) && value.length === 1) {
    return value[0];
  }

  return value;
};

const keyOverride = (key: string, value: any, websiteIRI: string, mapping: Record<string, string>) => {
  if (key === '/') {
    return websiteIRI;
  }

  if (key.startsWith('/') || key.startsWith('#')) {
    return appendPath(websiteIRI, key);
  }

  if (key === 'type' && dataTypes.includes(value)) {
    return undefined;
  }

  return mapping[key];
};

export const seedToSlice = (
  initialData: string | undefined,
  websiteIRI: string,
  mapping: Record<string, string>,
): Slice => {
  if (initialData === undefined) {
    return {};
  }

  const normalizedWebsiteIRI = normalizeTrailingSlash(websiteIRI);

  return JSON.parse(initialData, function(key: string, value: any) {
    const nextValue = getValue(value, normalizedWebsiteIRI, mapping);
    const differentKey = keyOverride(key, value, normalizedWebsiteIRI, mapping);

    if (differentKey) {
      // eslint-disable-next-line no-invalid-this
      this[differentKey] = nextValue;

      return undefined;
    }

    return nextValue;
  });
};

export const sliceToQuads = (slice: Slice): Quad[] => Object
  .values(slice)
  .flatMap(recordToQuads);

export const recordToQuads = (record: DataRecord): Quad[] => {
  const subject = record._id;

  return Object
    .entries(record)
    .reduce((acc, [field, value]) => {
      if (field === '_id') return acc;

      const predicate = rdf.namedNode(field);
      const fieldQuads = normalizeType(value)
        .map((v) => rdf.quad(
          subject,
          predicate,
          v,
        ));

      return [...acc, ...fieldQuads];
    }, [] as Quad[]);
};
