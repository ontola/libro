const validatorMap = {
  isEmail: (value) => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
    /* eslint no-useless-escape: 0 */
    return (!emailRegex.test(value)) ? 'Ongeldig e-mailadres' : undefined;
  },
  maxLength: max => value => (value && value.length > max ? `Maximaal ${max} tekens, nu ${value.length}` : undefined),
  minLength: min => value => (value && value.length < min ? `Minimaal ${min} tekens` : undefined),
  required: value => ((!value) ? 'Vereist' : undefined),
};

export function combineValidators(...validators) {
  return (value) => {
    const results = (Array.isArray(validators[0]) ? validators[0] : validators)
      .map(validator => validator && validator(value))
      .filter(validationRes => !!validationRes);
    return results.length > 0 ? results : undefined;
  };
}

// These will probably be sent by the backend
/* eslint no-magic-numbers: 0 */
export const argumentValidator = {
  side: [
    validatorMap.required,
  ],
  text: [
    validatorMap.maxLength(5000),
  ],
  title: [
    validatorMap.maxLength(70),
    validatorMap.minLength(5),
    validatorMap.required,
  ],
};

export default validatorMap;
