import {
  Literal,
  Node,
  QuadPosition,
  Quadruple,
  SomeTerm,
  Term,
  isBlankNode,
  isLiteral,
  isNamedNode,
} from '@ontologies/core';

import ld from '../../../Kernel/ontology/ld';

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
    ? 'globalId'
    : 'localId';
};

export const toHextuples = (quads: Quadruple[]): string[][] => quads
  .map((q) => [
    hexJSONSubject(q[QuadPosition.subject]),
    q[QuadPosition.predicate].value,
    hexJSONValue(q[QuadPosition.object]),
    hexJSONDataType(q[QuadPosition.object]),
    (q[QuadPosition.object] as Literal).language ?? '',
    q[QuadPosition.graph].value === 'rdf:defaultGraph' ? ld.supplant.value : q[QuadPosition.graph].value,
  ]);
