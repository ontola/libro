import rdf, { NamedNode, Quad } from '@ontologies/core';
import { AnyObject } from 'final-form';
import { LinkReduxLRSType } from 'link-redux';

import ll from '../../../ontology/ll';
import ontola from '../../../ontology/ontola';
import { cloneQuad, getKeys, getObjectValues, isNewObjectKey } from '../helpers';

const preSaveFormat = (lrs: LinkReduxLRSType, subject: NamedNode | null) => (
  values: AnyObject, originalStatements: Quad[]
) => {
  if (!subject) {
    return [];
  }
  const delta: Quad[] = [];
  originalStatements.forEach((statement) => {
    const s = cloneQuad(statement);
    const { objectKey } = getKeys(s);
    const { dataType, remove, value } = getObjectValues(values, objectKey);
    if (remove) {
      console.log('preSaveFormat remove', objectKey);
      s.graph = ontola.remove;
    } else if (value !== s.object.value) {
      console.log('preSaveFormat replace', objectKey);
      if (s.object.termType === "NamedNode") {
        s.object = rdf.namedNode(value);
      } else if (s.object.termType === "Literal") {
        s.object = rdf.literal(value, rdf.namedNode(dataType));
      } else if (s.object.termType === "BlankNode") {
        s.object = rdf.blankNode(value);
      }
      s.graph = ontola.replace;
    }
    delta.push(s);
  });
  Object.keys(values).forEach((objectKey) => {
    const { dataType, predicate, remove, value } = getObjectValues(values, objectKey);
    if (isNewObjectKey(objectKey) && !remove) {
      delta.push(rdf.quad(
        rdf.namedNode(subject.value),
        rdf.namedNode(predicate),
        dataType === 'NamedNode'
          ? rdf.namedNode(value)
          : rdf.literal(value, rdf.namedNode(dataType)),
        ll.supplant,
      ));
    }
  });
  console.log('delta', delta);
  lrs.processDelta(delta, true).then();
  return lrs.store.match(subject, null, null, null);
  // return delta;
}

export default preSaveFormat;
