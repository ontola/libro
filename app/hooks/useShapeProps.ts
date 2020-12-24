import sh from '@ontologies/shacl';
import {
  literal,
  ReturnType,
  useLink,
  useResourceLink,
} from 'link-redux';
import { PropParam } from 'link-redux/dist-types/types';
import { isNumber } from '../helpers/types';

import ontola from '../ontology/ontola';
import { FormFieldProps } from './useFormField';

const shapePropsFromObject = ['maxCount', 'maxInclusive', 'maxLength', 'minCount', 'minInclusive', 'minLength'];

interface ShapeForm {
  [key: string]: PropParam;
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

const useFieldShape = (props: FormFieldProps) => {
  const shapeProps = useLink(mapShapeProps) as ShapeForm;
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

  return shape;
};

export default useFieldShape;
