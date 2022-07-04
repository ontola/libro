import { QuadPosition, Quadruple } from '@ontologies/core';
import { DataRecord, FieldValue } from 'link-lib';
import { DataSlice } from 'link-lib/dist-types/store/StructuredStore';

export const quadruplesToDataSlice = (quads: Quadruple[]): DataSlice => quads.reduce<Record<string, DataRecord>>((acc, quad) => {
  const subject = quad[QuadPosition.subject].value;
  const predicate = quad[QuadPosition.predicate].value;
  const record = acc[subject] ?? {
    _id: quad[QuadPosition.subject],
  };
  let value: FieldValue = quad[QuadPosition.object];
  const existing = record[predicate];

  if (Array.isArray(existing)) {
    value = [
      ...existing,
      quad[QuadPosition.object],
    ];
  } else if (existing !== undefined) {
    value = [
      existing,
      quad[QuadPosition.object],
    ];
  }

  return {
    ...acc,
    [subject]: {
      ...record,
      [predicate]: value,
    },
  };
}, {});
