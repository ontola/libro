import React from 'react';
import { useIntl } from 'react-intl';

import { isNumber, isString } from '../../helpers/types';
import {
  CombinedValidator,
  Validator,
  combineValidators,
  createValidators,
} from '../../helpers/validators';
import { ResolvedShapeForm } from '../useShapeProps';

const stringToRegex = (string: string) =>
  new RegExp(
    string
      .replace('\\A', '^')
      .replace('\\z', '$')
      .replace('?x-mi:', '')
      .replace(/\s/g, ''),
    'u',
  );

const filterEntry = (validator: Validator | false) => validator ? [validator] : [];

export const useValidate = (fieldShape: ResolvedShapeForm): CombinedValidator => {
  const intl = useIntl();

  const validate = React.useMemo(() => {
    const validators = createValidators(intl);

    return combineValidators([
      ...filterEntry(isNumber(fieldShape.maxCount) && validators.maxCount(fieldShape.maxCount!)),
      ...filterEntry(isNumber(fieldShape.maxLength) && validators.maxLength(fieldShape.maxLength!)),
      ...filterEntry(isNumber(fieldShape.minCount) && validators.minCount(fieldShape.minCount!)),
      ...filterEntry(isNumber(fieldShape.minLength) && validators.minLength(fieldShape.minLength!)),
      ...filterEntry(isString(fieldShape.pattern) && validators.pattern(stringToRegex(fieldShape.pattern!))),
      ...filterEntry(!!fieldShape.required && validators.required),
    ]);
  }, [intl, fieldShape]);

  return validate;
};
