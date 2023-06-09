import {
  BlankNode,
  Literal,
  NamedNode,
  Quadruple,
  SomeTerm,
  isBlankNode,
  isNamedNode,
} from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
import * as xsd from '@ontologies/xsd';
import { DataRecord, DataSlice } from 'link-lib';

import {
  EmpBoolean,
  EmpString,
  GlobalId,
  LangString,
  LocalId,
  Primitive,
  Seed,
  SeedDataRecord,
  Value,
} from '../../Common/lib/seed';

import { quadruplesToDataSlice } from './quadruplesToDataSlice';

export const toEmpJson = (quads: Quadruple[]): Seed => {
  const slice = quadruplesToDataSlice(quads);

  return sliceToEmpJson(slice);
};

export const sliceToEmpJson = (slice: DataSlice): Seed => Object.entries(slice)
  .reduce((acc, [k, v]) => ({
    ...acc,
    [k]: recordToEmpJson(v),
  }), {} as Seed);

const recordToEmpJson = (record: DataRecord): SeedDataRecord => {
  const base: SeedDataRecord = {
    _id: empJsonAnyId(record._id),
  };

  return Object
    .entries(record)
    .reduce((acc, [k, v]) => ({
      ...acc,
      [k]: Array.isArray(v) ? v.map(valueToEmpJson) : valueToEmpJson(v),
    }), base);
};

const valueToEmpJson = (term: SomeTerm): Value => {
  if (isNamedNode(term)) {
    return empJsonId(term);
  } else if (isBlankNode(term)) {
    return empJsonLocalId(term);
  }

  switch (term.datatype) {
  case rdfx.langString:
    return empJsonLangString(term);
  case xsd.xsdboolean:
    return empJsonBool(term);
  case xsd.string:
    return empJsonString(term);
  default:
    return empJsonPrimitive(term);
  }
};

export const empJsonAnyId = (term: NamedNode | BlankNode): GlobalId | LocalId => isNamedNode(term)
  ? empJsonId(term)
  : empJsonLocalId(term);

export const empJsonId = (term: NamedNode): GlobalId => ({
  type: 'id',
  v: term.value,
});

export const empJsonLocalId = (term: BlankNode): LocalId => ({
  type: 'lid',
  v: term.value,
});

export const empJsonPrimitive = (term: Literal): Primitive => ({
  dt: term.datatype.value,
  type: 'p',
  v: term.value,
});

export const empJsonBool = (term: Literal): EmpBoolean => ({
  type: 'b',
  v: term.value,
});

export const empJsonString = (term: Literal): EmpString => ({
  type: 's',
  v: term.value,
});

export const empJsonLangString = (term: Literal): LangString => ({
  l: term.language!,
  type: 'ls',
  v: term.value,
});

