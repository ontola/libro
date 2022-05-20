import { SomeTerm } from '@ontologies/core';
import { DeepRecord, DeepRecordFieldValue } from 'link-lib/dist-types/store/StructuredStore';

import { getBumps } from './serialization';
import { serializeRecordOrValue } from './serializeValue';
import { ToDataObject } from './types';

const base = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#_';

type Entry = [field: string, value: DeepRecordFieldValue];

function numAsc(a: Entry, b: Entry) {
  const aP = Number.parseInt(a[0].slice(base.length), 10);
  const bP = Number.parseInt(b[0].slice(base.length), 10);

  return aP - bP;
}

export const serializeSeqObject = (
  record: DeepRecord,
  indentation: number,
  websiteIRI: string,
  toDataObject: ToDataObject,
): string => {
  const [shortBump, longBump, nextIndentation] = getBumps(indentation);

  let stringified = 'seq([\n';

  const serialize = (it: SomeTerm | DeepRecord) => serializeRecordOrValue(it,
    websiteIRI,
    nextIndentation,
    toDataObject,
  );

  Object.entries(record)
    .filter(([field]) => field.startsWith(base))
    .sort(numAsc)
    .forEach(([, it]) => {
      if (Array.isArray(it)) {
        for (let i = 0; i < it.length; i++) {
          stringified += `${longBump}${serialize(it[i])},\n`;
        }
      } else {
        stringified += `${longBump}${serialize(it)},\n`;
      }
    });

  stringified += `${shortBump}])`;

  return stringified;
};
