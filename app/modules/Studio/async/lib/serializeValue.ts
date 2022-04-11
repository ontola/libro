import {
  NamedNode,
  Quad,
  SomeTerm,
  isBlankNode,
  isNamedNode,
} from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
import * as xsd from '@ontologies/xsd';

import { quote } from './serialization';
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

export const serializeValue = (
  value: SomeTerm,
  data: Quad[],
  websiteIRI: string,
  indentation: number,
  toDataObject: ToDataObject,
): string | undefined => {
  if (isNamedNode(value)) {
    return serializeNamedNode(value, websiteIRI);
  }

  if (isBlankNode(value)) {
    return toDataObject(value, data, websiteIRI, indentation);
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
