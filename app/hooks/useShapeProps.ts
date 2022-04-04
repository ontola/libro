import { NamedNode, isNamedNode } from '@ontologies/core';
import * as sh from '@ontologies/shacl';
import equal from 'fast-deep-equal';
import { SomeNode } from 'link-lib';
import {
  LaxNode,
  ReturnType,
  literal,
  useResourceLink,
} from 'link-redux';
import React, { useState } from 'react';

import { formContext } from '../components/Form/FormContext';
import { isNumber } from '../helpers/types';
import ontola from '../ontology/ontola';

const shapePropsFromObject = [
  'maxCount',
  'maxInclusive',
  'maxLength',
  'minCount',
  'minInclusive',
  'minLength',
  'pattern',
  'shIn',
];

export interface ShapeForm extends ResolvedShapeForm {
  maxCountProp?: SomeNode;
  maxInclusiveProp?: SomeNode;
  minCountProp?: SomeNode;
  minInclusiveProp?: SomeNode;
  minLengthProp?: SomeNode;
  shInProp?: SomeNode;
}

export interface ShapeFromObjectForm {
  [key: string]: NamedNode;
}

export interface ResolvedShapeForm {
  maxCount?: number;
  maxInclusive?: number;
  maxLength?: number;
  minCount?: number;
  minInclusive?: number;
  minLength?: number;
  pattern?: string,
  required?: boolean;
  removable?: boolean;
  shIn?: SomeNode;

  [key: string]: SomeNode | number | boolean | string | undefined;
}

const mapShapeProps = {
  maxCount: literal(sh.maxCount),
  maxCountProp: ontola.maxCount,
  maxInclusive: literal(sh.maxInclusive),
  maxInclusiveProp: ontola.maxInclusive,
  maxLength: literal(sh.maxLength),
  minCount: literal(sh.minCount),
  minCountProp: ontola.minCount,
  minInclusive: literal(sh.minInclusive),
  minInclusiveProp: ontola.minInclusive,
  minLength: literal(sh.minLength),
  minLengthProp: ontola.minLength,
  pattern: literal(sh.pattern),
  shIn: sh.shaclin,
  shInProp: ontola.shIn,
};

const useFieldShape = (field: LaxNode, alwaysVisible: boolean): ResolvedShapeForm => {
  const { object } = React.useContext(formContext);
  const [fieldShape, setFieldShape] = useState({});
  const shapeProps = useResourceLink(field, mapShapeProps) as unknown as ShapeForm;
  const propsFromObjectMap: ShapeFromObjectForm = {};
  const shapeFromField: ResolvedShapeForm = {};

  shapePropsFromObject.forEach((prop) => {
    shapeFromField[prop] = shapeProps[prop];

    const predicate = shapeProps[`${prop}Prop`];

    if (isNamedNode(predicate)) {
      propsFromObjectMap[prop] = predicate;
    }
  });

  const empty = Object.keys(propsFromObjectMap).length === 0;
  const shapeFromObject = useResourceLink(
    empty ? field : object,
    empty ? {} : propsFromObjectMap,
    { returnType: ReturnType.Literal },
  );

  const shape = {
    ...shapeFromField,
    ...shapeFromObject,
  };

  shape.required = shape.minCount ? shape.minCount > 0 : false;
  shape.removable = ((shape.minCount !== 1 && !alwaysVisible)
    || (isNumber(shape.maxCount) && shape.maxCount > 1));

  if (!equal(fieldShape, shape)) {
    setFieldShape(shape);
  }

  return fieldShape;
};

export default useFieldShape;
