import {
  DeepSeed,
  DeepSeedDataRecord,
  DeepSeedFieldValue,
  GlobalId,
  Value,
  isValue,
} from '../../../Common/lib/seed';
import { removeTrailingSlash } from '../../../Kernel/lib/id';

const absolutiseId = (id: string, websiteIRI: string) => {
  if (id === websiteIRI) {
    return '/';
  }

  return id.indexOf(websiteIRI) === 0
    ? id.slice(removeTrailingSlash(websiteIRI).length)
    : id;
};

const absolutise = (value: Value, websiteIRI: string): Value => {
  if (value.type === 'id') {
    return {
      type: 'id',
      v: absolutiseId(value.v, websiteIRI),
    };
  }

  return value;
};

const deepRecordFieldValueToValue = (value: DeepSeedFieldValue, websiteIRI: string): DeepSeedFieldValue => {
  if (isValue(value)) {
    return absolutise(value, websiteIRI);
  }

  if (Array.isArray(value)) {
    return value.map((v) => isValue(v)
      ? absolutise(v, websiteIRI)
      : compactDeepSeedDataRecord(v, websiteIRI)) as Value[] | DeepSeedDataRecord[];
  }

  return compactDeepSeedDataRecord(value, websiteIRI);
};

export const compactDeepSeedDataRecord = (record: DeepSeedDataRecord, websiteIRI: string): DeepSeedDataRecord => {
  const { _id, ...fields } = record;

  return {
    _id: absolutise(record._id, websiteIRI) as GlobalId,
    ...Object.entries(fields).reduce((acc, [field, value]) => ({
      ...acc,
      [field]: deepRecordFieldValueToValue(value, websiteIRI),
    }), {}),
  };
};

/** Absolutises every global id in this slice to websiteIRI. */
export const compactDeepSeed = (seed: DeepSeed, websiteIRI: string): DeepSeed => Object
  .entries(seed)
  .reduce((acc, [id, record]) => ({
    ...acc,
    [absolutiseId(id, websiteIRI)]: compactDeepSeedDataRecord(record, websiteIRI),
  }), {});
