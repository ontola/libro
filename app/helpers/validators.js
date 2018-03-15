const validators = {
  isEmail: (value) => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
    /* eslint no-useless-escape: 0 */
    return (!emailRegex.test(value)) ?
      'Ongeldig e-mailadres' : undefined;
  },
  maxLength: max => value => (value && value.length > max ? `Maximaal ${max} tekens, nu ${value.length}` : undefined),
  minLength: min => value => (value && value.length < min ? `Minimaal ${min} tekens` : undefined),
  required: value => ((!value) ? 'Vereist' : undefined),
};

// These will probably be sent by the backend
/* eslint no-magic-numbers: 0 */
export const argumentValidator = {
  side: [
    validators.required,
  ],
  text: [
    validators.maxLength(5000),
  ],
  title: [
    validators.maxLength(70),
    validators.minLength(5),
    validators.required,
  ],
};

export default validators;
