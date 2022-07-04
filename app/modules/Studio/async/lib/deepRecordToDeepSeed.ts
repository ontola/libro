import { isTerm } from '@ontologies/core';
import { DeepRecord, DeepRecordFieldValue } from 'link-lib/dist-types/store/StructuredStore';

import {
  DeepSeedDataRecord,
  DeepSeedFieldValue,
  Value,
} from '../../../Common/lib/seed';

import { toId, toValue } from './graphToSeed';

const deepRecordFieldValueToValue = (value: DeepRecordFieldValue): DeepSeedFieldValue => {
  if (isTerm(value)) {
    return toValue(value);
  }

  if (Array.isArray(value)) {
    return value.map((v) => isTerm(v)
      ? toValue(v)
      : deepRecordToDeepSeed(v)) as Value[] | DeepSeedDataRecord[];
  }

  return deepRecordToDeepSeed(value);
};

export const deepRecordToDeepSeed = (
  record: DeepRecord,
): DeepSeedDataRecord => {
  const { _id, ...fields } = record;

  return {
    _id: toId(record._id),
    ...Object.entries(fields).reduce((acc, [field, value]) => ({
      ...acc,
      [field]: deepRecordFieldValueToValue(value),
    }), {}),
  };
};
