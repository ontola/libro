import { isTerm } from '@ontologies/core';

import { InputValue } from '../components/FormField/FormFieldTypes';

import { isMarkedForRemove } from './helpers';

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;

type ValidatorValues = InputValue[];
type ArrayValidator = (values: ValidatorValues) => string | false;
type ValueValidator = (value: string) => string | false;
type Validator = (values: ValidatorValues) => ValidationResult | Array<ValidationResult | undefined> | undefined;

interface ValidationResult {
    error: string;
    index?: number;
}

const arrayValidation = (validator: ArrayValidator) => (
  (values: ValidatorValues): ValidationResult | undefined => {
    const error = validator(values);

    return error ? { error } : undefined;
  }
);

const valueValidation = (validator: ValueValidator) => (
  (values: ValidatorValues): Array<ValidationResult | undefined> | undefined => (
    values?.map((value, index) => {
      const error = isTerm(value) ? validator(value.value) : undefined;

      return error ? {
        error,
        index,
      } : undefined;
    })
  )
);

const validatorMap = {
  isEmail: valueValidation((value) => value && !emailRegex.test(value) && 'Ongeldig e-mailadres'),
  maxCount: (max: number): Validator => arrayValidation((values) => values && values.length > max && `Maximaal ${max}`),
  maxLength: (max: number): Validator => valueValidation((value) => value && value.length > max && `Maximaal ${max} tekens, nu ${value.length}`),
  minCount: (min: number): Validator => arrayValidation((values) => values && values.length < min && `Minimaal ${min}`),
  minLength: (min: number): Validator => valueValidation((value) => value && value.length < min && `Minimaal ${min} tekens`),
  pattern: (pattern: RegExp): Validator => valueValidation((value) => (!value || pattern.test(value)) ? false : 'Waarde is niet toegestaan'),
  required: valueValidation((value) => !value && '*Vereist'),
};

export const combineValidators = (validators: Array<Validator | undefined>) => (
  (values: ValidatorValues): Array<ValidationResult | undefined> | ValidationResult | undefined => {
    const activeValues = values?.filter((val) => !isMarkedForRemove(val));
    const results = validators
      .flatMap((validator) => validator && validator(activeValues))
      .filter((validationRes) => !!validationRes?.error);

    return results.length > 0 ? results : undefined;
  }
);

export default validatorMap;
