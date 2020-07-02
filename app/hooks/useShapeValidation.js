import { isNamedNode } from '@ontologies/core';
import sh from '@ontologies/shacl';
import {
  useDataFetching,
  useLRS,
} from 'link-redux';
import React from 'react';

import { containerToArr, entityIsLoaded } from '../helpers/data';
import { tryParseInt } from '../helpers/numbers';

const conditionPath = (lrs, condition) => (
  condition.path ? containerToArr(lrs, [], condition.path) : []
);

const digDependencies = (lrs, acc, subject, path) => {
  acc.push(subject);

  if (path.length > 1 && entityIsLoaded(lrs, subject)) {
    const remaining = path.slice();
    const pred = remaining.shift();
    const values = lrs.getResourceProperties(subject, pred);
    values.forEach((val) => digDependencies(lrs, acc, val, remaining));
  }

  return acc;
};

const getDependentResources = (lrs, conditions, target) => {
  const resources = [];

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

const hasMaxCount = (lrs, maxCount, values) => {
  const result = values.length <= tryParseInt(maxCount);

  return result;
};

const hasMinCount = (lrs, minCount, values) => {
  const result = values.length >= tryParseInt(minCount);

  return result;
};

const hasValue = (lrs, value, values) => {
  const result = values.includes(value);

  return result;
};

const hasValueIn = (lrs, shIn, values) => {
  const inValues = shIn.flatMap((value) => (
    isNamedNode(value) ? containerToArr(lrs, [], value) : value
  ));
  const result = values.some((value) => inValues.includes(value));

  return result;
};

const resolveCondition = (lrs, condition, target) => {
  const path = conditionPath(lrs, condition);
  const values = lrs.dig(condition.targetNode || target, path);
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

const getNodeProperties = (lrs, nodes) => (
  nodes.map((node) => ({
    hasValue: lrs.getResourceProperty(node, sh.hasValue),
    maxCount: lrs.getResourceProperty(node, sh.maxCount),
    minCount: lrs.getResourceProperty(node, sh.minCount),
    path: lrs.getResourceProperty(node, sh.path),
    shIn: lrs.getResourceProperties(node, sh.in),
    targetNode: lrs.getResourceProperty(node, sh.targetNode),
  }))
);

const validateNestedShape = (lrs, node, target, dependentResources) => {
  const {
    dependentResources: currentDependentResources,
    pass,
    // eslint-disable-next-line no-use-before-define
  } = validateShape(lrs, node, target);
  dependentResources.push(...currentDependentResources);

  return pass;
};

const validateShape = (lrs, shape, targetFromProp) => {
  const targetNode = lrs.getResourceProperty(shape, sh.targetNode);
  const target = targetNode || targetFromProp;

  const andNodes = lrs.getResourceProperties(shape, sh.and);
  const orNodes = lrs.getResourceProperties(shape, sh.or);

  const ifNodes = lrs.getResourceProperties(shape, sh.property);
  const unlessNodes = lrs.getResourceProperties(shape, sh.not);
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

const useShapeValidation = (shape, target) => {
  const lrs = useLRS();
  const [dependentResources, setDependentResources] = React.useState([]);
  const [pass, setPass] = React.useState(false);
  const [timestamp, setTimestamp] = React.useState(null);
  React.useEffect(() => {
    const {
      dependentResources: currentDependentResources,
      pass: currentPass,
    } = validateShape(lrs, shape, target);
    setDependentResources(currentDependentResources);
    setPass(currentPass);
  }, [shape, target, timestamp]);

  const currentTimestamp = useDataFetching(dependentResources.filter(isNamedNode));
  if (currentTimestamp !== timestamp) {
    setTimestamp(currentTimestamp);
  }

  return pass;
};

export default useShapeValidation;
