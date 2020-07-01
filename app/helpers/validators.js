const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;

const arrayValidation = (validator) => (values) => {
  const error = validator(values);

  return error ? { error } : undefined;
};

const valueValidation = (validator) => (values) => (
  values?.map((value, index) => {
    const error = validator(value.value || value);

    return error ? {
      error,
      index,
    } : undefined;
  })
);

const validatorMap = {
  isEmail: valueValidation((value) => value && !emailRegex.test(value) && 'Ongeldig e-mailadres'),
  maxCount: (max) => arrayValidation((values) => values && values.length > max && `Maximaal ${max}`),
  maxLength: (max) => valueValidation((value) => value && value.length > max && `Maximaal ${max} tekens, nu ${value.length}`),
  minCount: (min) => arrayValidation((values) => values && values.length < min && `Minimaal ${min}`),
  minLength: (min) => valueValidation((value) => value && value.length < min && `Minimaal ${min} tekens`),
  required: valueValidation((value) => !value && '*Vereist'),
};

export function combineValidators(...validators) {
  return (values) => {
    const results = (Array.isArray(validators[0]) ? validators[0] : validators)
      .flatMap((validator) => validator && validator(values))
      .filter((validationRes) => !!validationRes?.error);

    return results.length > 0 ? results : undefined;
  };
}

export default validatorMap;
