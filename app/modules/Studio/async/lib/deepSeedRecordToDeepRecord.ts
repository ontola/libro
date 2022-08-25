import {
  DeepRecord,
  DeepRecordFieldValue,
  SomeNode, 
} from 'link-lib';

import {
  DeepSeedDataRecord,
  DeepSeedFieldValue,
  valueToStoreValue,
} from '../../../Common/lib/seed';

const isDeepValue = (value: DeepSeedFieldValue): value is DeepSeedDataRecord | DeepSeedDataRecord[] => {
  const toTest = Array.isArray(value) ? value[0] : value;

  return Object.prototype.hasOwnProperty.call(toTest, '_id');
};

export const deepSeedFieldToDeepRecordFieldValue = (value: DeepSeedFieldValue, websiteIRI: string, mapping: Record<string, string>): DeepRecordFieldValue => {
  if (isDeepValue(value)) {
    return Array.isArray(value)
      ? value.map((v) => deepSeedRecordToDeepRecord(v, websiteIRI, mapping))
      : deepSeedRecordToDeepRecord(value, websiteIRI, mapping);
  }

  return Array.isArray(value)
    ? value.map((v) => valueToStoreValue(v, websiteIRI, mapping))
    : valueToStoreValue(value, websiteIRI, mapping);
};

export const deepSeedRecordToDeepRecord = (
  seedRecord: DeepSeedDataRecord,
  websiteIRI: string,
  mapping: Record<string, string>,
): DeepRecord => {
  const { _id, ...fields } = seedRecord;

  return {
    _id: valueToStoreValue(seedRecord._id, websiteIRI, mapping) as SomeNode,
    ...Object.entries(fields).reduce((acc, [field, value]) => ({
      ...acc,
      [field]: deepSeedFieldToDeepRecordFieldValue(value, websiteIRI, mapping),
    }), {}),
  };
};
