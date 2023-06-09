import { DeepRecord } from 'link-lib';

import { DeepSeedDataRecord } from '../../../Common/lib/seed';
import { DeepSlice } from '../../lib/dataObjectsToDeepSlice';

import { deepSeedRecordToDeepRecord } from './deepSeedRecordToDeepRecord';
import { deepSliceToTypeScript } from './deepSliceToTypeScript';

export const deepSeedRecordToSource = (record: DeepSeedDataRecord, websiteIRI: string): string => {
  const deepSlice = {
    [record._id.v]: deepSeedRecordToDeepRecord(record, websiteIRI, window.EMP_SYMBOL_MAP),
  };

  return deepSliceToSource(
    deepSlice,
    websiteIRI,
  );
};

export const deepRecordToSource = (record: DeepRecord, websiteIRI: string): string =>
  deepSliceToSource({ [record._id.value]: record }, websiteIRI);

export const deepSliceToSource = (slice: DeepSlice, websiteIRI: string): string =>
  deepSliceToTypeScript(slice, websiteIRI)[0];
