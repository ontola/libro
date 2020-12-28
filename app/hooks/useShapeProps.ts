import sh from '@ontologies/shacl';
import equal from 'fast-deep-equal';
import {
  literal,
  ReturnType,
  useLink,
  useResourceLink,
} from 'link-redux';
import { PropParam } from 'link-redux/dist-types/types';
import { useState } from 'react';
import { isNumber } from '../helpers/types';

import ontola from '../ontology/ontola';
import { UseFormFieldProps } from './useFormField';

const shapePropsFromObject = ['maxCount', 'maxInclusive', 'maxLength', 'minCount', 'minInclusive', 'minLength'];

export interface ShapeForm {
  maxCount: number;
  maxCountProp: PropParam;
  maxInclusive: number;
  maxInclusiveProp: PropParam;
  maxLength: number;
  minCount: number;
  minCountProp: PropParam;
  minInclusive: number;
  minInclusiveProp: PropParam;
  minLength: number;
  minLengthProp: PropParam;
  required: boolean;
  removable: boolean;

  [key: string]: PropParam | number | boolean;
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
};

const useFieldShape = (props: UseFormFieldProps) => {
  const [fieldShape, setFieldShape] = useState({});
  const shapeProps = useLink(mapShapeProps) as unknown as ShapeForm;
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
    empty ? props.subject : props.object,
    empty ? {} : propMap,
    { returnType: ReturnType.Literal },
  );

  const shape = {
    ...shapeFromField,
    ...shapeFromObject,
  };

  shape.required = props.required || (shape.minCount ? shape.minCount > 0 : false);
  shape.removable = ((shape.minCount !== 1 && !props.alwaysVisible)
    || (isNumber(shape.maxCount) && shape.maxCount > 1));

  if (!equal(fieldShape, shape)) {
    setFieldShape(shape);
  }

  return fieldShape as ShapeForm;
};

export default useFieldShape;
