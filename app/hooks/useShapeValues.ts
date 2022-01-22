import rdfFactory, {
  QuadPosition,
  SomeTerm,
  isNamedNode,
  isNode,
} from '@ontologies/core';
import equal from 'fast-deep-equal';
import { SomeNode } from 'link-lib';
import {
  LaxNode,
  LinkReduxLRSType,
  ToJSOutputTypes,
  useDataFetching,
  useDataInvalidation,
  useLRS,
} from 'link-redux';
import React from 'react';

import { containerToArr } from '../helpers/data';
import { isPromise } from '../helpers/types';

import { NodeShape, ValuesFor } from './useShapeValidation';

export interface ValuesMap {
  [subject: number]: SomeTerm[];
}

interface ShShape {
  hasValue?: SomeTerm;
  maxCount?: ToJSOutputTypes;
  minCount?: ToJSOutputTypes;
  path?: SomeTerm;
  shIn?: SomeTerm[];
  targetNode?: SomeTerm;
}

const conditionPath = (lrs: LinkReduxLRSType, props?: ShShape): SomeTerm[] => {
  if (props && isNode(props.path)) {
    const arr = containerToArr(lrs, [], props.path);

    if (!isPromise(arr)) {
      return arr;
    }
  }

  return [];
};

const useShapeValues = (targetFromProp: LaxNode, shapeProps: NodeShape[]): ValuesFor => {
  const lrs = useLRS();
  const [shapeValues, setShapeValues] = React.useState<ValuesMap>({});
  const [nestedTargets, setNestedTargets] = React.useState<SomeNode[]>([]);
  const update = useDataInvalidation(nestedTargets);
  useDataFetching(nestedTargets.filter(isNamedNode));

  React.useEffect(() => {
    const resolvedTargets = new Set();
    const newMap: ValuesMap = {};

    shapeProps.forEach((currentProps) => {
      const target = isNode(currentProps?.targetNode) ? currentProps?.targetNode : targetFromProp;
      const path = conditionPath(lrs, currentProps).filter(isNamedNode);

      if (target && path) {
        const [dugQuads, dugTargets] = lrs.digDeeper(target, path);
        dugTargets.forEach((subj) => resolvedTargets.add(subj));
        newMap[rdfFactory.id(currentProps.subject)] = dugQuads.map((q) => q[QuadPosition.object]);
      }
    });

    setNestedTargets(Array.from(resolvedTargets).filter(isNode));

    if (!equal(newMap, shapeValues)) {
      setShapeValues(newMap);
    }
  }, [lrs, shapeProps, update, targetFromProp]);

  return React.useCallback<ValuesFor>((shape: SomeNode) => {
    const value = shapeValues[rdfFactory.id(shape)];

    if (!value) {
      return undefined;
    }

    return lrs.store.canon(value);
  }, [shapeValues]);
};

export default useShapeValues;
