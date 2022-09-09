import {
  isBlankNode,
  isNamedNode,
  isSomeTerm,
  isTerm,
} from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
import { DeepRecord } from 'link-lib';

import { DeepSlice } from '../../lib/dataObjectsToDeepSlice';

import { getBumps, quoteForObjectKey } from './serialization';
import { serializeSeqObject } from './serializeSeqObject';
import {
  serializeDocumentIdValue,
  serializeRecordOrValue,
  serializeValue,
} from './serializeValue';
import { shortenGlobalId } from './shortMap';

const regularObject = (
  record: DeepRecord,
  websiteIRI: string,
  indentation: number,
): string | undefined => {
  const [shortBump, longBump, nextIndentation] = getBumps(indentation);
  let stringified = '{\n';

  const { _id, ...fields } = record;

  if (Object.keys(fields).length === 0) {
    return undefined;
  }

  if (isNamedNode(record._id)) {
    stringified += `${longBump}"@id": ${serializeDocumentIdValue(record._id, websiteIRI)},\n`;
  }

  for (const [k, v] of Object.entries(fields)) {
    const key = quoteForObjectKey(shortenGlobalId(k, websiteIRI));
    let value: string | undefined;

    if (Array.isArray(v)) {
      const [, deepBump] = getBumps(nextIndentation);
      const values = v.map((it) => {
        if (isSomeTerm(it)) {
          return deepBump + serializeRecordOrValue(
            it,
            websiteIRI,
            nextIndentation,
            toDataObject,
          );
        }

        return deepBump + serializeRecordOrValue(
          it,
          websiteIRI,
          nextIndentation,
          toDataObject,
        );

      });
      const serialized = values.join(',\n');
      value = `[\n${serialized},\n${longBump}]`;
    } else if (isTerm(v)) {
      value = serializeValue(v, websiteIRI);
    } else {
      value = serializeRecordOrValue(v, websiteIRI, nextIndentation, toDataObject);
    }

    if (value !== undefined) {
      stringified += `${longBump}${key}: ${value},\n`;
    }
  }

  stringified += `${shortBump}}`;

  return stringified;
};

export const toDataObject = (
  record: DeepRecord,
  websiteIRI: string,
  indentation = 0,
): string | undefined => {
  const isSeq = record[rdfx.type.value] === rdfx.Seq;

  if (isSeq && isBlankNode(record._id)) {
    return serializeSeqObject(record, indentation, websiteIRI, toDataObject);
  }

  return regularObject(record, websiteIRI, indentation);
};

export const toDataDocument = (
  record: DeepRecord,
  websiteIRI: string,
  indentation = 0,
): [result: (string | undefined), multiple: boolean] => {
  if (isBlankNode(record._id)) {
    return [toDataObject(record, websiteIRI, indentation), false];
  }

  return [toDataObject(record, websiteIRI, indentation), false];
};

export const deepSliceToTypeScript = (data: DeepSlice, websiteIRI: string, indentation = 0): [serialized: string, multiple: boolean] => {
  const ids = Object.keys(data);

  if (ids.length === 0) {
    return ['({})', false];
  }

  if (ids.length > 1) {
    const [, longBump, nestedIndent] = getBumps(indentation);
    const t = Object.values(data).reduce((acc, obj) => {
      const [stringified] = toDataDocument(obj, websiteIRI, nestedIndent);

      return acc + longBump + stringified + ',\n';
    }, '[\n');

    return [`${t}]\n`, true];
  }

  const [stringified] = toDataDocument(data[ids[0]], websiteIRI, indentation);

  return [`(${stringified ?? '{}'})`, false];
};
