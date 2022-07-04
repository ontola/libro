import { TElement } from '@udecode/plate';
import { PlateStoreState } from '@udecode/plate-core/dist/types/PlateStore';

import { DeepSeedDataRecord } from '../../../Common/lib/seed';
import { deepSeedRecordToDeepRecord } from '../../../Studio/async/lib/deepSeedRecordToDeepRecord';

import { toDescendant } from './deepSeedRecordToElementsValue/toDescendant';
import {
  isElementsRecord,
  toElementsDeepRecord,
} from './deepSeedRecordToElementsValue/toElementsDeepRecord';

export const deepSeedRecordToElementsValue = (record: DeepSeedDataRecord, websiteIRI: string, mapping: Record<string, string>): PlateStoreState['value'] => {
  const compiled = deepSeedRecordToDeepRecord(record, websiteIRI, mapping);

  if (!isElementsRecord(compiled)) {
    throw new Error('Record not an Elements record');
  }

  const elementsDeepRecord = toElementsDeepRecord(compiled);
  const child = toDescendant(elementsDeepRecord);

  return child.children as TElement[];
};
