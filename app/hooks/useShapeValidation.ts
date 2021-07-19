import {
  SomeTerm,
  isNamedNode,
  isNode,
} from '@ontologies/core';
import * as sh from '@ontologies/shacl';
import { SomeNode } from 'link-lib';
import {
  LaxNode,
  LinkReduxLRSType,
  ToJSOutputTypes,
  literal,
  term,
  terms,
  useDataFetching,
  useLRS,
  useResourceLinks,
} from 'link-redux';
import { LinkedDataObject, TermOpts } from 'link-redux/dist-types/types';
import React from 'react';

import {
  arraysEqual,
  containerToArr,
} from '../helpers/data';
import { isPromise } from '../helpers/types';

import useShapeValues from './useShapeValues';

const shapePropsMap = {
  hasValue: term(sh.hasValue),
  maxCount: literal(sh.maxCount),
  minCount: literal(sh.minCount),
  path: term(sh.path),
  shAnd: terms(sh.and),
  shIf: terms(sh.property),
  shIn: terms(sh.shaclin),
  shOr: terms(sh.or),
  targetNode: term(sh.targetNode),
  unless: terms(sh.not),
};

type RawNodeShape = LinkedDataObject<typeof shapePropsMap, TermOpts>;

export interface NodeShape extends RawNodeShape {
  shInValues: SomeTerm[];
}
export type ValuesFor = (subject: SomeNode) => SomeTerm[] | undefined;

const hasMaxCount = (maxCount: ToJSOutputTypes | undefined, values: SomeTerm[]) => (
  maxCount === undefined || values.length <= maxCount
);

const hasMinCount = (minCount: ToJSOutputTypes | undefined, values: SomeTerm[]) => (
  minCount === undefined || values.length >= minCount
);

const hasValue = (value: SomeTerm | undefined, values: SomeTerm[]) => (
  value === undefined || values.includes(value)
);

const hasValueIn = (shIn: SomeTerm[], values: SomeTerm[]) => (
  values.some((value) => (
    shIn.includes(value)
  ))
);

const resolveCondition = (
  shapeProps: NodeShape[],
  valuesFor: ValuesFor,
  shape: SomeNode,
): boolean => {
  const props = shapeProps.find((p) => p.subject === shape);
  const values = isNode(shape) ? valuesFor(shape) : undefined;

  if (!props || !values) {
    return false;
  }

  if (!hasValue(props.hasValue, values)) {
    return false;
  }

  if (props.shIn.length > 0 && !hasValueIn(props.shInValues, values)) {
    return false;
  }

  if (!hasMaxCount(props.maxCount, values)) {
    return false;
  }

  if (!hasMinCount(props.minCount, values)) {
    return false;
  }

  return true;
};

const validateShape = (shapeProps: NodeShape[], valuesFor: ValuesFor, shape: SomeNode) => {
  const props = shapeProps.find((p) => p.subject === shape);

  if (!props) {
    return false;
  }

  if (props.shOr.length > 0) {
    const passedOrNodes = props.shOr.filter(isNode).filter((node) => (
      validateShape(shapeProps, valuesFor, node)),
    );

    if (passedOrNodes.length === 0) {
      return false;
    }
  }

  if (props.shAnd.length > 0) {
    const failedAndNodes = props.shAnd.filter(isNode).filter((node) => (
      !validateShape(shapeProps, valuesFor, node)
    ));

    if (failedAndNodes.length > 0) {
      return false;
    }
  }

  if (props.shIf.length > 0) {
    const ifFailed = !props.shIf.filter(isNode).every((ifShape) => (
      resolveCondition(shapeProps, valuesFor, ifShape)),
    );

    if (ifFailed) {
      return false;
    }
  }

  if (props.unless.length > 0) {
    const unlessFailed = props.unless.filter(isNode).some((unlessShape) => (
      resolveCondition(shapeProps, valuesFor, unlessShape)),
    );

    if (unlessFailed) {
      return false;
    }
  }

  return true;
};

const normalizeProps = (lrs: LinkReduxLRSType, props: RawNodeShape): NodeShape => {
  const hasValueProp = props.hasValue ? lrs.store.canon(props.hasValue) : undefined;
  const shInValues = props.shIn.flatMap((value) => {
    const acc = isNamedNode(value) ? containerToArr<SomeTerm>(lrs, [], value) : value;

    if (isPromise(acc)) {
      return [];
    }

    return acc;
  }).map((v) => lrs.store.canon(v));

  return {
    ...props,
    hasValue: hasValueProp,
    shInValues,
  };
};

const useShapeDependencies = (normalizedProps: NodeShape[]) => {
  const [dependencies, setDependencies] = React.useState<SomeNode[]>([]);
  useDataFetching(dependencies);

  React.useEffect(() => {
    const newDependencies = new Set();

    for (const props of normalizedProps) {
      for (const item of props.shIn) {
        newDependencies.add(item);
      }

      newDependencies.add(props.targetNode);
    }

    setDependencies(Array.from(newDependencies).filter(isNode));
  }, [normalizedProps]);
};

const useShapeProps = (shape: SomeNode): NodeShape[] => {
  const lrs = useLRS();
  const [shapes, setShapes] = React.useState<SomeNode[]>([shape]);
  const shapeProps = useResourceLinks(shapes, shapePropsMap);
  useDataFetching(shapes);
  const [normalizedProps, setNormalizedProps] = React.useState<NodeShape[]>([]);
  React.useEffect(() => {
    setNormalizedProps(shapeProps.map((props) => normalizeProps(lrs, props)));
  }, [shapeProps]);
  useShapeDependencies(normalizedProps);

  React.useEffect(() => {
    const newShapesSet = new Set();

    shapeProps.forEach((currentProps) => {
      newShapesSet.add(currentProps.subject);
      currentProps.shAnd.forEach((node) => newShapesSet.add(node));
      currentProps.shOr.forEach((node) => newShapesSet.add(node));
      currentProps.shIf.forEach((node) => newShapesSet.add(node));
      currentProps.unless.forEach((node) => newShapesSet.add(node));
    });

    const newShapes = Array.from(newShapesSet).filter(isNode);

    if (!arraysEqual(shapes, newShapes)) {
      setShapes(newShapes);
    }
  }, [shapeProps]);

  return normalizedProps;
};

const useShapeValidation = (shape: SomeNode, targetFromProp: LaxNode): boolean => {
  const shapeProps = useShapeProps(shape);
  const valuesFor = useShapeValues(targetFromProp, shapeProps);

  return React.useMemo(() => (
    validateShape(shapeProps, valuesFor, shape)
  ), [shapeProps, valuesFor]);
};

export default useShapeValidation;
