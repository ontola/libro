import * as rdfx from '@ontologies/rdf';
import { DeepRecord } from 'link-lib';

import elements from '../../../../Elements/ontology/elements';

const memberPrefix = rdfx.ns('_').value;

const extractFieldIndex = (field: string): number => field.startsWith(memberPrefix)
  ? Number(field.split(memberPrefix).pop())
  : NaN;

export const elementsChildren = (record: DeepRecord): DeepRecord[] => {
  const children = record[elements.children.value];

  if (children === undefined) {
    return [];
  }

  return Object.entries(children)
    .map<[number, DeepRecord]>(([field, value]) => [
      extractFieldIndex(field),
      value,
    ])
    .filter(([field]) => !isNaN(field))
    .sort(([a], [b]) => a! - b!)
    .map(([, value]) => value);
};
