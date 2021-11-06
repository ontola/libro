import {
  Literal,
  Node,
  Quad,
  SomeTerm,
  Term,
  isBlankNode,
  isLiteral,
  isNamedNode,
} from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';

import ld from '../../../../ontology/ld';

const hexJSONSubject = (subject: Node): string => (isBlankNode(subject)
  ? `_:${subject.value}`
  : subject.value);

const hexJSONValue = (object: SomeTerm): string => (isLiteral(object)
  ? object.value
  : hexJSONSubject(object));

const hexJSONDataType = (object: Term) => {
  if (isLiteral(object)) {
    return object.datatype.value;
  }

  return isNamedNode(object)
    ? rdfx.ns('namedNode').value
    : rdfx.ns('blankNode').value;
};

export const serializeHextuples = (quads: Quad[]): string => quads
  .map((q) => JSON.stringify([
    hexJSONSubject(q.subject),
    q.predicate.value,
    hexJSONValue(q.object),
    hexJSONDataType(q.object),
    (q.object as Literal).language ?? '',
    q.graph.value === 'rdf:defaultGraph' ? ld.add.value : q.graph.value,
  ]))
  .join('\n');
