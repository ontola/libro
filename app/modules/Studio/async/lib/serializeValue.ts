import {
  NamedNode,
  SomeTerm,
  isBlankNode,
  isNamedNode,
  isSomeTerm,
  isTerm,
} from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
import * as xsd from '@ontologies/xsd';
import { DeepRecord } from 'link-lib/dist-types/store/StructuredStore';

import {
  getBumps,
  quote,
  quoteForObjectKey,
} from './serialization';
import { serializeSeqObject } from './serializeSeqObject';
import { shortenGlobalId } from './shortMap';
import { NodeType, ToDataObject } from './types';

const integerTypes = [
  xsd.integer,
  xsd.xsdlong,
  xsd.xsdint,
  xsd.unsignedInt,
  xsd.unsignedLong,
];
const bigIntTypes = [
  xsd.positiveInteger,
  xsd.nonNegativeInteger,
  xsd.negativeInteger,
  xsd.nonPositiveInteger,
];
const numberTypes = [
  ...integerTypes,
  xsd.xsdshort,
  xsd.unsignedShort,
  xsd.xsdbyte,
  xsd.unsignedByte,
  xsd.xsdfloat,
  xsd.decimal,
];
const dateTypes = [
  xsd.date,
  xsd.dateTime,
  xsd.dateTimeStamp,
];

export const serializeDocumentIdValue = (value: NamedNode, websiteIRI: string): string => {
  const shortened = shortenGlobalId(value.value, websiteIRI);

  switch (shortened.type) {
  case NodeType.LocalPath:
    return `local(${quote(shortened.value)}).value`;
  case NodeType.Shorthand:
    return `${shortened.value}.value`;
  case NodeType.StringValue:
    return quote(shortened.value);
  }
};

const serializeNamedNode = (value: NamedNode, websiteIRI: string): string => {
  const shortened = shortenGlobalId(value.value, websiteIRI);

  switch (shortened.type) {
  case NodeType.StringValue:
    return `url(${quote(shortened.value)})`;
  case NodeType.LocalPath:
    return `local(${quote(shortened.value)})`;
  case NodeType.Shorthand:
    return shortened.value;
  }
};

const serializePlainDeepRecord = (
  record: DeepRecord,
  websiteIRI: string,
  indentation: number,
  toDataObject: ToDataObject,
): string | undefined => {
  const [shortBump, longBump, nextIndentation] = getBumps(indentation);
  let stringified = '{\n';

  const { _id, ...fields } = record;

  if (Object.keys(fields).length === 0) {
    return undefined;
  }

  if (isNamedNode(_id)) {
    stringified += `${longBump}"@id": ${serializeDocumentIdValue(_id, websiteIRI)},\n`;
  }

  for (const [k, v] of Object.entries(fields)) {
    const key = quoteForObjectKey(shortenGlobalId(k, websiteIRI));
    let value: string | undefined;

    if (Array.isArray(v)) {
      const [, deepBump] = getBumps(nextIndentation);
      const values = v.map((it) => deepBump + serializeRecordOrValue(
        it,
        websiteIRI,
        nextIndentation,
        toDataObject,
      ));
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

export const serializeDeepRecord = (
  record: DeepRecord,
  websiteIRI: string,
  indentation: number,
  toDataObject: ToDataObject,
): string | undefined => {
  const isSeq = record[rdfx.type.value] === rdfx.Seq;

  if (isSeq && isBlankNode(record._id)) {
    return serializeSeqObject(record, indentation, websiteIRI, toDataObject);
  }

  return serializePlainDeepRecord(
    record,
    websiteIRI,
    indentation,
    toDataObject,
  );
};

export const serializeRecordOrValue = (
  value: SomeTerm | DeepRecord,
  websiteIRI: string,
  indentation: number,
  toDataObject: ToDataObject,
): string | undefined => {
  if (isSomeTerm(value)) {
    return serializeValue(value, websiteIRI);
  }

  return serializeDeepRecord(
    value,
    websiteIRI,
    indentation,
    toDataObject,
  );
};

export const serializeValue = (
  value: SomeTerm,
  websiteIRI: string,
): string | undefined => {
  if (isNamedNode(value)) {
    return serializeNamedNode(value, websiteIRI);
  }

  if (isBlankNode(value)) {
    throw new Error(`Dangling blank node ${value.value}`);

  }

  if (value.datatype === xsd.xsdboolean) {
    return value.value === 'true'
      ? 'true'
      : 'false';
  }

  if (value.datatype === rdfx.langString) {
    return `lang(${quote(value.language!)}, ${quote(value.value)})`;
  }

  if (dateTypes.includes(value.datatype)) {
    return `date(${quote(value.value)})`;
  }

  if (bigIntTypes.includes(value.datatype)) {
    return `BigInt(${quote(value.value)})`;
  }

  if (numberTypes.includes(value.datatype)) {
    return value.value;
  }

  return quote(value.value);
};
