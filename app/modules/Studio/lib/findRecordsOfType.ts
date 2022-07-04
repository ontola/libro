import * as rdfx from '@ontologies/rdf';

import {
  DeepSeedDataRecord,
  Value,
} from '../../Common/lib/seed';

const isDataObject = (value: any): value is DeepSeedDataRecord =>
  typeof value === 'object' && Object.prototype.hasOwnProperty.call(value, '_id');

const checkForType = (record: DeepSeedDataRecord, type: Value): boolean => {
  const types = (record['type'] ?? record[rdfx.type.value]) as Value | Value[] | undefined;

  if (Array.isArray(types)) {
    return types.includes(type);
  }

  return types?.v === type.v;
};

export const findNestedRecordsOfType = (record: DeepSeedDataRecord | undefined, type: Value, path: string[] = []): Array<[record: DeepSeedDataRecord, path: string[]]> => {
  const records: Array<[record: DeepSeedDataRecord, path: string[]]> = [];

  if (record === undefined) return records;

  if (checkForType(record, type)) {
    records.push([record, path]);
  } else {
    for (const [field, value] of Object.entries(record)) {
      if (Array.isArray(value)) {
        for (const v of value) {
          if (isDataObject(v)) {
            records.push(...findNestedRecordsOfType(v, type, [...path, field]));
          }
        }
      }

      if (isDataObject(value)) {
        records.push(...findNestedRecordsOfType(value, type, [...path, field]));
      }
    }
  }

  return records;
};
