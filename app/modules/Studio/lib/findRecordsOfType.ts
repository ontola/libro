import { NamedNode } from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
import { DeepRecord } from 'link-lib/dist-types/store/StructuredStore';

import { DeepSlice } from './dataObjectsToDeepSlice';

const isDataObject = (value: any): value is DeepRecord => typeof value === 'object' && Object.prototype.hasOwnProperty.call(value, '_id');

const checkForType = (record: DeepRecord, type: NamedNode): boolean => {
  const types = (record['type'] ?? record[rdfx.type.value]) as NamedNode | NamedNode[] | undefined;

  if (Array.isArray(types)) {
    return types.includes(type);
  }

  return types === type;
};

export const findObjectsOfType2 = (record: DeepRecord, type: NamedNode): DeepRecord[] => {
  const records: DeepRecord[] = [];

  if (checkForType(record, type)) {
    records.push(record);
  } else {
    for (const value of Object.values(record)) {
      if (Array.isArray(value)) {
        for (const v of value) {
          if (isDataObject(v)) {
            records.push(...findObjectsOfType2(v, type));
          }
        }
      }

      if (isDataObject(value)) {
        records.push(...findObjectsOfType2(value, type));
      }
    }
  }

  return records;
};

export const findRecordsOfType = (slice: DeepSlice, type: NamedNode): DeepRecord[] => {
  const records: DeepRecord[] = [];

  for (const obj of Object.values(slice)) {
    if (!obj) continue;

    if (checkForType(obj, type)) {
      records.push(obj);
    } else {
      records.push(...findObjectsOfType2(obj, type));
    }
  }

  return records;
};
