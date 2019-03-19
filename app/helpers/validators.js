const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;

const validatorMap = {
  isEmail: value => (value && !emailRegex.test(value) ? 'Ongeldig e-mailadres' : undefined),
  maxLength: max => value => (value && value.length > max ? `Maximaal ${max} tekens, nu ${value.length}` : undefined),
  minLength: min => value => (value && value.length < min ? `Minimaal ${min} tekens` : undefined),
  required: value => (!value ? '*Vereist' : undefined),
};

export function combineValidators(...validators) {
  return (value) => {
    const results = (Array.isArray(validators[0]) ? validators[0] : validators)
      .map(validator => validator && validator(value))
      .filter(validationRes => !!validationRes);

    return results.length > 0 ? results : undefined;
  };
}

export default validatorMap;
