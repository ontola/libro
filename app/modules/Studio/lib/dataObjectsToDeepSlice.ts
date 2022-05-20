import rdf, {
  SomeTerm,
  isNode,
  isTerm,
} from '@ontologies/core';
import {
  DataObject,
  DeepRecord,
  DeepRecordFieldValue,
  SerializableDataTypes,
  SerializablePrimitives,
  SomeNode,
} from 'link-lib';

export type DeepSlice = Record<string, DeepRecord>;

const idOrBlank = (value: DataObject): SomeNode => {
  const embedded = value['@id'];

  if (isNode(embedded))
    return embedded;

  if (typeof embedded === 'string' && embedded[0] === '<' && embedded[embedded.length] === '>')
    return rdf.namedNode(embedded.slice(1, -1));

  if (typeof embedded === 'string')
    return rdf.namedNode(embedded);

  return rdf.blankNode();
};

const isDataObject = (value: any): value is DataObject => !isTerm(value) && typeof value === 'object';

const valueToTerm = (value: SerializablePrimitives): SomeTerm | DeepRecord => {
  if (isTerm(value))
    return value;

  if (typeof value === 'string' && value[0] === '<' && value[value.length] === '>')
    return rdf.namedNode(value.slice(1, -1));

  if (isDataObject(value)) {
    value['@id'] ||= idOrBlank(value);

    return objectToDeepRecord(value);
  }

  return rdf.literal(value);
};

const valuesToTerm = (value: SerializableDataTypes): DeepRecordFieldValue => {
  if (Array.isArray(value))
    return value.map((val) => valueToTerm(val));

  return valueToTerm(value);
};

const objectToDeepRecord = (obj: DataObject): DeepRecord => {
  const id = idOrBlank(obj);
  const record: DeepRecord = {
    _id: id,
  };

  for (const [key, value] of Object.entries(obj)) {
    if (key == '@id') continue;

    record[key.slice(1, -1)] = valuesToTerm(value);
  }

  return record;
};

const addObjectToSlice = (slice: DeepSlice, obj: DataObject) => {
  const record = objectToDeepRecord(obj);
  slice[record._id.value] = record;
};

export const dataObjectsToDeepSlice = (objects: DataObject[]): DeepSlice => {
  const slice: DeepSlice = {};

  for (const obj of objects) {
    addObjectToSlice(slice, obj);
  }

  return slice;
};
