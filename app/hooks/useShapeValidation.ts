import { isNamedNode, NamedNode, SomeTerm } from '@ontologies/core';
import * as sh from '@ontologies/shacl';
import { SomeNode } from 'link-lib';
import {
  LinkReduxLRSType,
  useDataFetching,
  useLRS,
} from 'link-redux';
import React from 'react';

import { containerToArr, entityIsLoaded } from '../helpers/data';
import { tryParseInt } from '../helpers/numbers';
import { isPromise } from '../helpers/types';

interface ShShape {
  hasValue: SomeNode | undefined;
  maxCount: SomeNode | undefined;
  minCount: SomeNode | undefined;
  path: SomeNode | undefined;
  shIn: SomeNode[];
  targetNode: SomeNode | undefined;
}

const conditionPath = <T extends SomeTerm>(lrs: LinkReduxLRSType, condition: ShShape): T[] => {
  if (condition.path) {
    const arr = containerToArr(lrs, [], condition.path);
    if (!isPromise(arr)) {
      return arr as T[];
    }
  }

  return [];
};

const digDependencies = (lrs: LinkReduxLRSType, acc: SomeNode[], subject: SomeNode, path: SomeNode[]) => {
  acc.push(subject);

  if (path.length > 1 && entityIsLoaded(lrs, subject)) {
    const remaining = path.slice();
    const pred = remaining.shift()!;
    const values = lrs.getResourceProperties<SomeNode>(subject, pred);
    values.forEach((val) => digDependencies(lrs, acc, val, remaining));
  }

  return acc;
};

const getDependentResources = (lrs: LinkReduxLRSType, conditions: ShShape[], target: SomeNode): SomeNode[] => {
  const resources: SomeNode[] = [];

  conditions.forEach((condition) => {
    if (condition.shIn) {
      resources.push(...condition.shIn.filter(isNamedNode));
    }
    if (condition.targetNode) {
      resources.push(condition.targetNode);
    }
    if (condition.path) {
      resources.push(...digDependencies(lrs, [], target, conditionPath(lrs, condition)));
    }
  });

  return resources;
};

const hasMaxCount = (_: LinkReduxLRSType, maxCount: SomeTerm, values: SomeTerm[]) => {
  return values.length <= tryParseInt(maxCount)!;
};

const hasMinCount = (_: LinkReduxLRSType, minCount: SomeTerm, values: SomeTerm[]) => {
  return values.length >= tryParseInt(minCount)!;
};

const hasValue = (_: LinkReduxLRSType, value: SomeTerm, values: SomeTerm[]) => {
  return values.includes(value);
};

const hasValueIn = (lrs: LinkReduxLRSType, shIn: SomeTerm[], values: SomeTerm[]) => {
  const inValues = shIn.flatMap((value) => (
    isNamedNode(value) ? containerToArr(lrs, [], value) as SomeTerm[] : value
  ));

  return values.some((value) => inValues.includes(value));
};

const resolveCondition = (lrs: LinkReduxLRSType, condition: ShShape, target: SomeNode): boolean => {
  const path = conditionPath(lrs, condition);
  const values = lrs.dig(condition.targetNode || target, path as NamedNode[]) as SomeTerm[];
  if (condition.hasValue && !hasValue(lrs, condition.hasValue, values)) {
    return false;
  }
  if (condition.shIn.length > 0 && !hasValueIn(lrs, condition.shIn, values)) {
    return false;
  }
  if (condition.maxCount && !hasMaxCount(lrs, condition.maxCount, values)) {
    return false;
  }
  if (condition.minCount && !hasMinCount(lrs, condition.minCount, values)) {
    return false;
  }

  return true;
};

const getNodeProperties = (lrs: LinkReduxLRSType, nodes: SomeNode[]): ShShape[] => (
  nodes.map((node) => ({
    hasValue: lrs.getResourceProperty(node, sh.hasValue),
    maxCount: lrs.getResourceProperty(node, sh.maxCount),
    minCount: lrs.getResourceProperty(node, sh.minCount),
    path: lrs.getResourceProperty(node, sh.path),
    shIn: lrs.getResourceProperties(node, sh.shaclin),
    targetNode: lrs.getResourceProperty(node, sh.targetNode),
  }))
);

const validateNestedShape = (
  lrs: LinkReduxLRSType,
  node: SomeNode,
  target: SomeNode,
  dependentResources: SomeNode[],
) => {
  const {
    dependentResources: currentDependentResources,
    pass,
    // eslint-disable-next-line no-use-before-define
  } = validateShape(lrs, node, target);
  dependentResources.push(...currentDependentResources);

  return pass;
};

const validateShape = (lrs: LinkReduxLRSType, shape: SomeNode, targetFromProp: SomeNode) => {
  const targetNode = lrs.getResourceProperty<SomeNode>(shape, sh.targetNode);
  const target = targetNode || targetFromProp;

  const andNodes = lrs.getResourceProperties<SomeNode>(shape, sh.and);
  const orNodes = lrs.getResourceProperties<SomeNode>(shape, sh.or);

  const ifNodes = lrs.getResourceProperties<SomeNode>(shape, sh.property);
  const unlessNodes = lrs.getResourceProperties<SomeNode>(shape, sh.not);
  const ifProps = getNodeProperties(lrs, ifNodes);
  const unlessProps = getNodeProperties(lrs, unlessNodes);

  const dependentResources = getDependentResources(lrs, ifProps.concat(unlessProps), target);

  let pass = true;
  const passedOrNodes = orNodes
    .filter((node) => validateNestedShape(lrs, node, target, dependentResources));
  if (orNodes.length > 0 && passedOrNodes.length === 0) {
    pass = false;
  }
  const failedAndNodes = andNodes
    .filter((node) => !validateNestedShape(lrs, node, target, dependentResources));
  if (failedAndNodes.length > 0) {
    pass = false;
  }
  if (pass && !ifProps.every((condition) => resolveCondition(lrs, condition, target))) {
    pass = false;
  }
  if (pass && unlessProps.some((condition) => resolveCondition(lrs, condition, target))) {
    pass = false;
  }

  return {
    dependentResources,
    pass,
  };
};

const useShapeValidation = (shape: SomeNode, target: SomeNode | undefined) => {
  const lrs = useLRS();
  const [dependentResources, setDependentResources] = React.useState<SomeNode[]>([]);
  const [pass, setPass] = React.useState(false);
  const [timestamp, setTimestamp] = React.useState<number | null>(null);
  React.useEffect(() => {
    if (target) {
      const {
        dependentResources: currentDependentResources,
        pass: currentPass,
      } = validateShape(lrs, shape, target);
      setDependentResources(currentDependentResources);
      setPass(currentPass);
    }
  }, [shape, target, timestamp]);

  const currentTimestamp = useDataFetching(dependentResources.filter(isNamedNode));
  if (currentTimestamp !== timestamp) {
    setTimestamp(currentTimestamp);
  }

  return pass;
};

export default useShapeValidation;
