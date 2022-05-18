import { isBlankNode, isTerm } from '@ontologies/core';
import { SomeNode } from 'link-lib';
import { DeepRecord } from 'link-lib/dist-types/store/StructuredStore';

import { Slice, sliceToQuads } from '../../../../helpers/seed';
import { DeepSlice } from '../../lib/dataObjectsToDeepSlice';

import { toWrappedDataDocument } from './quadsToDataObject';

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
      slice[toSliceId(_id)][field] = value.map(() => {
        if (Array.isArray(value))
          throw new Error('Too many nestings man...');
        if (isTerm(value))
          return value;

        return walkChildren(slice, value);
      });
    } else {
      slice[toSliceId(_id)][field] = walkChildren(slice, value);
    }
  }

  return _id;
};

const unnest = (deepSlice: DeepSlice): Slice => {
  const slice: Slice = {};

  for (const deepRecord of Object.values(deepSlice)) {
    walkChildren(slice, deepRecord);
  }

  return slice;
};

export const deepSliceToSource = (slice: DeepSlice, websiteIRI: string): string => {
  const shallow = unnest(slice);
  console.log('shallow', shallow);
  const quads = sliceToQuads(shallow);
  console.log('quads', quads);
  const firstId = Object.values(slice)[0]?._id;

  return toWrappedDataDocument(firstId, quads, websiteIRI);
};
