import * as sh from '@ontologies/shacl';
import equal from 'fast-deep-equal';
import { SomeNode } from 'link-lib';
import {
  ReturnType,
  literal,
  useResourceLink,
} from 'link-redux';
import React, { useState } from 'react';

import { FormContext } from '../components/Form/Form';
import { isNumber } from '../helpers/types';
import ontola from '../ontology/ontola';

import { UseFormFieldProps } from './useFormField';

const shapePropsFromObject = ['maxCount', 'maxInclusive', 'maxLength', 'minCount', 'minInclusive', 'minLength', 'shIn'];

export interface ShapeForm {
  maxCount: number;
  maxCountProp: SomeNode;
  maxInclusive: number;
  maxInclusiveProp: SomeNode;
  maxLength: number;
  minCount: number;
  minCountProp: SomeNode;
  minInclusive: number;
  minInclusiveProp: SomeNode;
  minLength: number;
  minLengthProp: SomeNode;
  required: boolean;
  removable: boolean;
  shIn: SomeNode;

  [key: string]: SomeNode | number | boolean;
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
  shIn: sh.shaclin,
};

const useFieldShape = (props: UseFormFieldProps): ShapeForm => {
  const { object } = React.useContext(FormContext);
  const [fieldShape, setFieldShape] = useState({});
  const shapeProps = useResourceLink(props.subject, mapShapeProps) as unknown as ShapeForm;
  const propMap = {} as ShapeForm;
  const shapeFromField = {} as ShapeForm;

  shapePropsFromObject.forEach((prop) => {
    shapeFromField[prop] = shapeProps[prop];

    if (shapeProps[`${prop}Prop`]) {
      propMap[prop] = shapeProps[`${prop}Prop`];
    }
  });

  const empty = Object.keys(propMap).length === 0;
  const shapeFromObject = useResourceLink(
    empty ? props.subject : object,
    empty ? {} : propMap,
    { returnType: ReturnType.Literal },
  );

  const shape = {
    ...shapeFromField,
    ...shapeFromObject,
  };

  shape.required = shape.minCount ? shape.minCount > 0 : false;
  shape.removable = ((shape.minCount !== 1 && !props.alwaysVisible)
    || (isNumber(shape.maxCount) && shape.maxCount > 1));

  if (!equal(fieldShape, shape)) {
    setFieldShape(shape);
  }

  return fieldShape as ShapeForm;
};

export default useFieldShape;
