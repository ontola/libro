import {
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

import { isPromise } from '../../Kernel/lib/typeCheckers';
import { containerToArr } from '../../Kernel/lib/data';

import { NodeShape, ValuesFor } from './useShapeValidation';

export type ValuesMap = Record<string, SomeTerm[]>;

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
        newMap[currentProps.subject!.value] = dugQuads.map((q) => q[QuadPosition.object]);
      }
    });

    setNestedTargets(Array.from(resolvedTargets).filter(isNode));

    if (!equal(newMap, shapeValues)) {
      setShapeValues(newMap);
    }
  }, [lrs, shapeProps, update, targetFromProp]);

  return React.useCallback<ValuesFor>((shape: SomeNode) => {
    const value = shapeValues[shape.value];

    if (!value) {
      return undefined;
    }

    return value.map((v) => {
      if (isNode(v)) {
        return lrs.store.primary(v);
      }

      return v;
    });
  }, [shapeValues]);
};

export default useShapeValues;
