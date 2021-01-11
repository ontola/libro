import rdf, { Quad } from '@ontologies/core';
import { AnyObject } from 'final-form';
import React from 'react';

import { PredicateKeysType } from './FormState/useFormStateReducer';
import useStyles from './useStyles';

export const addPredicate = (values: AnyObject, predicate: string) => {
  if (predicateExists(values, predicate)) {
    return;
  }
  const countNewPredicates = Object.keys(values)
    .filter((key1) => key1.startsWith(`pn`)).length;
  const key = `pn${countNewPredicates + 1}`;
  values[key] = predicate;
};

export const cloneQuad = (s: Quad): Quad => ({
  graph: s.graph ? { ...s.graph } : rdf.defaultGraph(),
  object: { ...s.object },
  predicate: { ...s.predicate },
  subject: { ...s.subject },
});

export const getKeys = (quad: Quad) => {
  const predicateKey = `p${quad.predicate.id}`;
  const objectKey = `${predicateKey}_o${quad.object.id}`;
  return {
    dataTypeKey: `${objectKey}_dataType`,
    deleteKey: `${objectKey}_delete`,
    newObjectKey: `${predicateKey}_newObject`,
    objectKey,
    predicateKey,
  };
};

export const getObjectValues = (values: AnyObject, objectKey: string) => ({
  dataType: values[`${objectKey}_dataType`],
  predicate: values[getPredicateKey(objectKey)],
  remove: values[`${objectKey}_delete`] === true,
  value: values[objectKey],
});

export interface ObjectKeytype {
  key: string;
  samePredicate: boolean;
}

export const getObjectKeys = (values: AnyObject, predicateKey: string) => (
  Object
    .keys(values)
    .filter((key) => key.includes(`${predicateKey}_o`) && key.includes('_delete'))
    .map((key) => key.substring(0, key.length - 7))
);

export const getPredicateKey = (key: string) => (
  key.substring(0, key.indexOf('_'))
);

export const getPredicateKeys = (values: AnyObject): PredicateKeysType => {
  const keys = Object
    .keys(values)
    .filter((key) => !key.includes('_') && key.startsWith('p'))
    .sort((pred1, pred2) => values[pred1] < values[pred2] ? -1 : 1);

  const result: PredicateKeysType = {};
  for (const key of keys) {
    const firstPart = getFirstPart(values[key]);
    if (!result.hasOwnProperty(firstPart)) {
      result[firstPart] = [key];
    } else {
      result[firstPart].push(key);
    }
  }

  return result;
};

export const isNewObjectKey = (key: string) => (
  key.includes('_on') && !key.includes('_dataType') && !key.includes('_delete')
);

export const isNewPredicateKey = (key: string) => (
  !key.includes('_') && key.startsWith('pn')
);

export const predicateExists = (values: AnyObject, predicate: string) => (
  Object.entries(values)
    .findIndex(([key, value]) => (
      key.startsWith('p') && !key.includes('_') && value === predicate
    )) > -1
);

export const getFirstPart = (path: string): string => {
  const hash = path.lastIndexOf('#');
  const slash = path.lastIndexOf('/');
  if (hash === slash) {
    return path;
  }

  return path.substring(0, hash > slash ? hash + 1 : slash + 1);
};

export const getLastPart = (path: string): string => {
  const hash = path.lastIndexOf('#');
  const slash = path.lastIndexOf('/');
  if (hash === slash) {
    return path;
  }

  return path.substring(hash > slash ? hash + 1 : slash + 1);
};

export const RenderCount = () => {
  const classes = useStyles();
  const renders = React.useRef(0);

  return <i className={classes.renderCount}>{++renders.current}</i>;
};
