import { isTerm } from '@ontologies/core';
import { IntlShape } from 'react-intl';

import { InputValue } from '../hooks/useFormField';
import { formValidationMessages } from '../translations/messages';

import { isMarkedForRemove } from './forms';

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;

type ValidatorValues = InputValue[];
type ArrayValidator = (values: ValidatorValues) => string | false;
type ValueValidator = (value: string) => string | false;

export type Validator = (values: ValidatorValues) => ValidationResult[];

export type CombinedValidator = (values: ValidatorValues) => ValidationResult[] | undefined;
interface ValidationResult {
  error: string;
  index?: number;
}

interface Validators {
  isEmail: Validator;
  maxCount: (max: number) => Validator;
  maxLength: (max: number) => Validator;
  minCount: (min: number) => Validator;
  minLength: (min: number) => Validator;
  pattern: (pattern: RegExp) => Validator;
  required: Validator;
}

const arrayValidation = (validator: ArrayValidator) => (
  (values: ValidatorValues): ValidationResult[] => {
    const error = validator(values);

    return error ? [{ error }] : [];
  }
);

const valueValidation = (validator: ValueValidator) => (
  (values: ValidatorValues): ValidationResult[] => {
    if (!values) {
      return [];
    }

    return values.flatMap((value, index) => {
      const error = isTerm(value) ? validator(value.value) : undefined;

      return error ? {
        error,
        index,
      } : [];
    });
  }
);

const requiredValueValidation = (validator: ValueValidator, errorMessage: string) => (
  (values: ValidatorValues): ValidationResult[] => {
    if (!values || values.length === 0) {
      return [{
        error: errorMessage,
        index: 0,
      }];
    }

    return valueValidation(validator)(values);
  }
);

export const createValidators = (intl: IntlShape): Validators => ({
  isEmail: valueValidation((value) =>
    value && !emailRegex.test(value) && intl.formatMessage(formValidationMessages.invalidEmail)),

  maxCount: (max) => arrayValidation((values) =>
    values && values.length > max && intl.formatMessage(formValidationMessages.maxCount, { max }),
  ),

  maxLength: (max) => valueValidation((value) =>
    value && value.length > max && intl.formatMessage(formValidationMessages.maxLength, {
      count: value.length,
      max,
    }),
  ),

  minCount: (min) => arrayValidation((values) =>
    values && values.length < min && intl.formatMessage(formValidationMessages.minCount, { min }),
  ),

  minLength: (min) => valueValidation((value) =>
    value && value.length < min && intl.formatMessage(formValidationMessages.minLength, { min }),
  ),

  pattern: (pattern) => valueValidation((value) =>
    (!value || pattern.test(value)) ? false : intl.formatMessage(formValidationMessages.pattern),
  ),

  required: requiredValueValidation(
    (value) => !value && intl.formatMessage(formValidationMessages.required),
    intl.formatMessage(formValidationMessages.required),
  ),
});

export const combineValidators = (validators: Validator[]): CombinedValidator => (
  (values) => {
    const activeValues = values?.filter((val) => !isMarkedForRemove(val));
    const results = validators.flatMap((validator) => validator(activeValues));

    return results.length > 0 ? results : undefined;
  }
);

export const diffError = (errors: ValidationResult[] | undefined): string => {
  if (!errors) {
    return '';
  }

  return errors.map((error) => error.error).join('');
};
