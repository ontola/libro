import { Quad } from '@ontologies/core';
import { AnyObject } from 'final-form';
import { getKeys } from '../helpers';

const postLoadFormat = (statements: Quad[]) => {
  const values: AnyObject = {};
  statements.forEach((s) => {
    const keys = getKeys(s);
    values[keys.predicateKey] = s.predicate.value;
    values[keys.objectKey] = s.object.value;
    values[keys.dataTypeKey] = s.object.termType === 'Literal' ? s.object.datatype.value : 'NamedNode';
    values[keys.deleteKey] = false;
    values[keys.newObjectKey] = false;
  });
  return values;
};

export default postLoadFormat;
