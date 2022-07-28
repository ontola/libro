import { quadruplesToDataSlice } from '../../../Kernel/lib/quadruplesToDataSlice';
import parseToGraph from '../../lib/parseToGraph';
import { nestSeed } from '../../../Common/lib/nestSeed';

import { compactDeepSeed } from './compactDeepSeed';
import { deepRecordToDeepSeed } from './deepRecordToDeepSeed';
import { deepSeedRecordToDeepRecord } from './deepSeedRecordToDeepRecord';
import { expandDeepSeed } from './expandDeepSeed';
import { flattenSeed } from './flattenSeed';
import { graphToSeed } from './graphToSeed';
import { sliceToDeepSeed } from './sliceToDeepSeed';

declare global {
  interface Window {
    debugTools: {
      compactDeepSeed: typeof compactDeepSeed;
      parseToGraph: typeof parseToGraph;
      deepRecordToDeepSeed: typeof deepRecordToDeepSeed;
      deepSeedRecordToDeepRecord: typeof deepSeedRecordToDeepRecord;
      expandDeepSeed: typeof expandDeepSeed;
      flattenSeed: typeof flattenSeed;
      graphToSeed: typeof graphToSeed;
      nestSeed: typeof nestSeed;
      quadruplesToDataSlice: typeof quadruplesToDataSlice;
      sliceToDeepSeed: typeof sliceToDeepSeed;
    }
    projectCtx: unknown;
  }
}

window.debugTools = {
  compactDeepSeed,
  deepRecordToDeepSeed,
  deepSeedRecordToDeepRecord,
  expandDeepSeed,
  flattenSeed,
  graphToSeed,
  nestSeed,
  parseToGraph,
  quadruplesToDataSlice,
  sliceToDeepSeed,
};
