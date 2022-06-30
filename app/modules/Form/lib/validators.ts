import { isTerm } from '@ontologies/core';
import React from 'react';
import {
  IntlShape,
  MessageDescriptor,
  useIntl,
} from 'react-intl';

import { isNumber, isString } from '../../Common/lib/typeCheckers';
import { InputValue } from '../components/FormField/FormFieldTypes';
import { ResolvedShapeForm } from '../hooks/useFieldShape';

import { isMarkedForRemove } from './helpers';
import { validationMessages } from './messages';

type ValidatorValues = InputValue[];
type ArrayValidator = (values: ValidatorValues) => boolean;
type ValueValidator = (value: string) => boolean;
type Validator = (values: ValidatorValues) => ValidationResult[];
type CombinedValidator = (values: ValidatorValues) => ValidationResult[] | undefined;

interface ValidatorFactory {
  arrayValidator?: ArrayValidator;
  valueValidator?: ValueValidator;
  message: MessageDescriptor,
  messageArgs?: (args: any) => Record<string, string | number>
}

interface ValidationResult {
    error: string;
    index?: number;
}

export const validatorMap: Record<string, (args?: any) => ValidatorFactory> = {
  maxCount: (max: number) => ({
    arrayValidator: (values) => values ? values.length <= max : true,
    message: validationMessages.maxCount,
    messageArgs: () => ({ max }),
  }),
  maxLength: (max: number) => ({
    message: validationMessages.maxLength,
    messageArgs: (value) => ({
      count: value.length,
      max,
    }),
    valueValidator: (value) => value ? value.length <= max : true,
  }),
  minCount: (min: number) => ({
    arrayValidator: (values) => values ? values.length >= min : true,
    message: validationMessages.minCount,
    messageArgs: () => ({ min }),
  }),
  minLength: (min: number) => ({
    message: validationMessages.minLength,
    messageArgs: (value) => ({
      count: value.length,
      min,
    }),
    valueValidator: (value) => value ? value.length >= min : true,
  }),
  pattern: (pattern: RegExp) => ({
    message: validationMessages.pattern,
    valueValidator: (value) => value ? pattern.test(value) : true,
  }),
  required: () => ({
    message: validationMessages.required,
    valueValidator: (value) => value ? true : false,
  }),
};

const arrayValidation = (intl: IntlShape, validatorFactory: ValidatorFactory) => (
  (values: ValidatorValues): ValidationResult[] => {
    const valid = validatorFactory.arrayValidator!(values);

    return valid ? [] : [{
      error: intl.formatMessage(
        validatorFactory.message,
        validatorFactory.messageArgs ? validatorFactory.messageArgs(values) : {},
      ),
    }];
  }
);

const valueValidation = (intl: IntlShape, validatorFactory: ValidatorFactory) => (
  (values: ValidatorValues): ValidationResult[] => (
    values.map((value, index) => {
      const valid = isTerm(value) ? validatorFactory.valueValidator!(value.value) : true;

      return valid ? undefined : {
        error: intl.formatMessage(
          validatorFactory.message,
          validatorFactory.messageArgs ? validatorFactory.messageArgs(values) : {},
        ),
        index,
      };
    }).filter(Boolean)
  ) as ValidationResult[]
);

const stringToRegex = (string: string) => new RegExp(
  string
    .replace('\\A', '^')
    .replace('\\z', '$')
    .replace('?x-mi:', '')
    .replace(/\s/g, ''),
  'u',
);

export const createValidator = (intl: IntlShape, validatorFactory: ValidatorFactory): Validator => (
  validatorFactory?.arrayValidator
    ? arrayValidation(intl, validatorFactory)
    : valueValidation(intl, validatorFactory!)
);

export const combineValidators = (intl: IntlShape, validatorFactories: Array<ValidatorFactory | undefined>): CombinedValidator => {
  const validators = validatorFactories
    .filter(Boolean)
    .map((validatorFactory) => createValidator(intl, validatorFactory!));

  return (
    (values: ValidatorValues): ValidationResult[] | undefined => {
      const activeValues = values?.filter((val) => !isMarkedForRemove(val)) ?? [];
      const results = validators
        .flatMap((validator) => validator(activeValues))
        .filter((validationRes) => !!validationRes?.error);

      return results.length > 0 ? results : undefined;
    }
  );
};

const useValidators = (fieldShape: ResolvedShapeForm): CombinedValidator => {
  const intl = useIntl();

  return React.useMemo(() => combineValidators(intl, [
    isNumber(fieldShape.maxCount) ? validatorMap.maxCount(fieldShape.maxCount) : undefined,
    isNumber(fieldShape.maxLength) ? validatorMap.maxLength(fieldShape.maxLength) : undefined,
    isNumber(fieldShape.minCount) ? validatorMap.minCount(fieldShape.minCount) : undefined,
    isNumber(fieldShape.minLength) ? validatorMap.minLength(fieldShape.minLength) : undefined,
    isString(fieldShape.pattern) ? validatorMap.pattern(stringToRegex(fieldShape.pattern)) : undefined,
    fieldShape.required ? validatorMap.required() : undefined,
  ]), [intl, fieldShape]);
};

export default useValidators;
