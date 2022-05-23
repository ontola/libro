import { isBlankNode, isTerm } from '@ontologies/core';
import { SomeNode } from 'link-lib';
import { DeepRecord } from 'link-lib/dist-types/store/StructuredStore';

import {
  DeepSeedDataRecord,
  Slice,
  sliceToQuads,
} from '../../../../helpers/seed';
import { DeepSlice } from '../../lib/dataObjectsToDeepSlice';

import { deepSeedRecordToDeepRecord } from './deepSeedRecordToDeepRecord';
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

const unnest = (deepSlice: DeepSlice): Slice => {
  const slice: Slice = {};

  for (const deepRecord of Object.values(deepSlice)) {
    walkChildren(slice, deepRecord);
  }

  return slice;
};

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

export const deepSliceToSource = (slice: DeepSlice, websiteIRI: string): string => {
  const shallow = unnest(slice);
  const quads = sliceToQuads(shallow);
  const firstId = Object.values(slice)[0]?._id;

  return toWrappedDataDocument(firstId, quads, websiteIRI);
};
