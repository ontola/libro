import { DeepSeed, Slice } from '../../../../helpers/seed';

import { deepRecordToDeepSeed } from './deepRecordToDeepSeed';

export const sliceToDeepSeed = (slice: Slice): DeepSeed => Object
  .entries(slice)
  .reduce((acc, [id, record]) => ({
    ...acc,
    [id]: deepRecordToDeepSeed(record),
  }), {});
