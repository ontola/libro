import {
  DeepSeed,
  DeepSeedDataRecord,
  DeepSeedFieldValue,
  GlobalId,
  Value,
  isValue,
} from '../../../Common/lib/seed';
import { appendPath } from '../../../Kernel/lib/id';

const expandId = (id: string, websiteIRI: string) => {
  if (id === '/') {
    return websiteIRI;
  }

  if (id.startsWith('/#')) {
    return appendPath(websiteIRI, id.slice(1));
  }

  if (id.startsWith('/') || id.startsWith('#')) {
    return appendPath(websiteIRI, id);
  }

  return id;
};

const expand = (value: Value, websiteIRI: string): Value => {
  if (value.type === 'id') {
    return {
      type: 'id',
      v: expandId(value.v, websiteIRI),
    };
  }

  return value;
};

const deepRecordFieldValueToValue = (value: DeepSeedFieldValue, websiteIRI: string): DeepSeedFieldValue => {
  if (isValue(value)) {
    return expand(value, websiteIRI);
  }

  if (Array.isArray(value)) {
    return value.map((v) => isValue(v)
      ? expand(v, websiteIRI)
      : expandDeepSeedDataRecord(v, websiteIRI)) as Value[] | DeepSeedDataRecord[];
  }

  return expandDeepSeedDataRecord(value, websiteIRI);
};

export const expandDeepSeedDataRecord = (record: DeepSeedDataRecord, websiteIRI: string): DeepSeedDataRecord => {
  const { _id, ...fields } = record;

  return {
    _id: expand(record._id, websiteIRI) as GlobalId,
    ...Object.entries(fields).reduce((acc, [field, value]) => ({
      ...acc,
      [field]: deepRecordFieldValueToValue(value, websiteIRI),
    }), {}),
  };
};

/** Expands every absolute global id in this slice to include the websiteIRI. */
export const expandDeepSeed = (seed: DeepSeed, websiteIRI: string): DeepSeed => Object
  .entries(seed)
  .reduce((acc, [id, record]) => ({
    ...acc,
    [expandId(id, websiteIRI)]: expandDeepSeedDataRecord(record, websiteIRI),
  }), {});
