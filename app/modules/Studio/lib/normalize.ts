import rdf, { isTerm } from '@ontologies/core';
import { DataObject, SerializableDataTypes } from 'link-lib';

const isSerializablePrimitive = (obj: any): obj is Exclude<SerializableDataTypes, DataObject> => {
  if (obj === undefined || obj === null) {
    throw new Error('Value in serializable object was empty.');
  }

  if (Array.isArray(obj)) {
    return obj.every((e) => isSerializablePrimitive(e));
  }

  const isDataValue = typeof obj === 'boolean'
    || typeof obj === 'number'
    || typeof obj === 'string'
    || isTerm(obj)
    || obj.constructor === Date
    || obj.constructor === File;

  if (!isDataValue && typeof obj !== 'object') {
    throw new Error(`Data wasn't a serializable primitive nor a DataObject ('${typeof obj}', '${obj}')`);
  }

  return isDataValue;
};

const nameIdempotently = <T extends DataObject | SerializableDataTypes>(obj: T, path: string): T => {
  if (Array.isArray(obj)) {
    return obj.map((e, i) => nameIdempotently(e, `${path}.${i}`)) as T;
  }

  if (isSerializablePrimitive(obj)) {
    return obj;
  }

  const seed: DataObject = { '@id': (obj as any)['@id'] ?? rdf.namedNode(path) };

  return Object.entries(obj)
    .reduce(
      (acc, [k, v]) => ({
        ...acc,
        [k]: nameIdempotently(v, `${path}.${k}`),
      }),
      seed,
    ) as T;
};

export const normalize = (data: DataObject[] | DataObject[][], idempotentNaming = true): DataObject[] => {
  const flattened: DataObject[] = data.flat();

  return idempotentNaming
    ? flattened.map((obj) => nameIdempotently(obj, (obj['@id'] as string) ?? rdf.blankNode().value))
    : flattened;
};
