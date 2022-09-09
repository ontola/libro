import { isBlankNode, isTerm } from '@ontologies/core';
import { DeepRecord, SomeNode   } from 'link-lib';

import { Slice } from '../../../Common/lib/seed';
import { DeepSlice } from '../../lib/dataObjectsToDeepSlice';

const toSliceId = (v: SomeNode): string => isBlankNode(v) ? `_:${v.value}` : v.value;

const walkChildren = (slice: Slice, deepSlice: DeepRecord): SomeNode => {
  const { _id, ...fields } = deepSlice;
  slice[toSliceId(_id)] = {
    _id,
  };

  for (const [field, value] of Object.entries(fields)) {
    if (isTerm(value)) {
      slice[toSliceId(_id)][field] = value;
    } else if (Array.isArray(value)) {
      slice[toSliceId(_id)][field] = value.map((v) => {
        if (Array.isArray(v))
          throw new Error('Too many nestings man...');
        if (isTerm(v))
          return v;

        return walkChildren(slice, v);
      });
    } else {
      slice[toSliceId(_id)][field] = walkChildren(slice, value);
    }
  }

  return _id;
};

export const unnest = (deepSlice: DeepSlice): Slice => {
  const slice: Slice = {};

  for (const deepRecord of Object.values(deepSlice)) {
    walkChildren(slice, deepRecord);
  }

  return slice;
};
