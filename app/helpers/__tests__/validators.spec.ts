/* eslint-disable @typescript-eslint/no-magic-numbers */
import rdf from '@ontologies/core';
import { IntlShape, MessageDescriptor } from 'react-intl';

import { formValidationMessages } from '../../translations/messages';
import { combineValidators, createValidators } from '../validators';

const errorMap = new Map([
  ['isEmail', formValidationMessages.invalidEmail.id],
  ['maxCount', formValidationMessages.maxCount.id],
  ['maxLength', formValidationMessages.maxLength.id],
  ['minCount', formValidationMessages.minCount.id],
  ['minLength', formValidationMessages.minLength.id],
  ['pattern', formValidationMessages.pattern.id],
  ['required', formValidationMessages.required.id],
]);

const intlMock = {
  formatMessage: (descriptor: MessageDescriptor) => descriptor.id,
};

describe('Validators', () => {
  describe('isEmail', () => {
    it('returns an empty array on valid email', () => {
      const validators = createValidators(intlMock as IntlShape);
      const result = validators.isEmail([rdf.literal('staff@argu.co')]);

      expect(result).toHaveLength(0);
    });

    it('returns error message id on invalid email', () => {
      const validators = createValidators(intlMock as IntlShape);
      const result = validators.isEmail([rdf.literal('a@a.a')]);

      expect(result).toHaveLength(1);

      expect(result[0].error).toBe(errorMap.get('isEmail'));
    });

    it('adds the correct index to the error message', () => {
      const validators = createValidators(intlMock as IntlShape);
      const result = validators.isEmail([
        rdf.literal('staff@argu.co'),
        rdf.literal('a@a.a'),
      ]);

      expect(result).toHaveLength(1);

      expect(result[0].index).toBe(1);
    });
  });

  describe('maxCount', () => {
    it('returns an empty array on valid count', () => {
      const validators = createValidators(intlMock as IntlShape);
      const validator = validators.maxCount(2);

      const result = validator([rdf.literal('value1')]);

      expect(result).toHaveLength(0);
    });

    it('returnes error message on invalid input', () => {
      const validators = createValidators(intlMock as IntlShape);
      const validator = validators.maxCount(2);

      const result = validator([rdf.literal('value1'), rdf.literal('value2'), rdf.literal('value3')]);

      expect(result).toHaveLength(1);
      expect(result[0].error).toBe(errorMap.get('maxCount'));
    });
  });

  describe('maxLength', () => {
    it('returns an empty array when input is valid', () => {
      const validators = createValidators(intlMock as IntlShape);
      const validator = validators.maxLength(10);

      const result = validator([rdf.literal('value1')]);

      expect(result).toHaveLength(0);
    });

    it('returns an error when input is invalid', () => {
      const validators = createValidators(intlMock as IntlShape);
      const validator = validators.maxLength(10);

      const result = validator([rdf.literal('A sentence which very being trencends the translation of the concrete into the abstractness that is communication.')]);

      expect(result).toHaveLength(1);
      expect(result[0].error).toBe(errorMap.get('maxLength'));
    });
  });

  describe('minCount', () => {
    it('returns an empty array when the amount of values is higher or equal to the configured min count', () => {
      const validators = createValidators(intlMock as IntlShape);
      const validator = validators.minCount(2);
      const result = validator([rdf.literal('value1'), rdf.literal('value2')]);

      expect(result).toHaveLength(0);
    });

    it('returns an error when the amount of values given is lower than the configured min count', () => {
      const validators = createValidators(intlMock as IntlShape);
      const validator = validators.minCount(2);
      const result = validator([rdf.literal('value1')]);

      expect(result).toHaveLength(1);
      expect(result[0].error).toBe(errorMap.get('minCount'));
    });
  });

  describe('minLength', () => {
    it('returns an empty array when the values length is equal or larger than the configured minimum length', () => {
      const validators = createValidators(intlMock as IntlShape);
      const validator = validators.minLength(10);
      const result = validator([rdf.literal('A very long sentence')]);

      expect(result).toHaveLength(0);
    });

    it('returns an error when the values length is smaller than the configured minimum length', () => {
      const validators = createValidators(intlMock as IntlShape);
      const validator = validators.minLength(10);
      const result = validator([rdf.literal('Mand!')]);

      expect(result).toHaveLength(1);
      expect(result[0].error).toBe(errorMap.get('minLength'));
    });
  });

  describe('pattern', () => {
    it('returns an empty array when the value matches the configured pattern', () => {
      const validators = createValidators(intlMock as IntlShape);
      const validator = validators.pattern(/^[a-zA-Z0-9]*$/);
      const result = validator([rdf.literal('abc123')]);

      expect(result).toHaveLength(0);
    });
    it('returns an error when the value does not match the configured pattern', () => {
      const validators = createValidators(intlMock as IntlShape);
      const validator = validators.pattern(/^[a-zA-Z0-9]*$/);
      const result = validator([rdf.literal('&82s()f')]);

      expect(result).toHaveLength(1);
      expect(result[0].error).toBe(errorMap.get('pattern'));
    });

  });

  describe('required', () => {
    it('returns an empty array when the value is not empty', () => {
      const validators = createValidators(intlMock as IntlShape);
      const validator = validators.required;
      const result = validator([rdf.literal('value')]);

      expect(result).toHaveLength(0);
    });

    it('returns an error when the value is empty', () => {
      const validators = createValidators(intlMock as IntlShape);
      const validator = validators.required;
      const result = validator([rdf.literal('')]);

      expect(result).toHaveLength(1);
      expect(result[0].error).toBe(errorMap.get('required'));
    });

    it('returns an error when no value is given', () => {
      const validators = createValidators(intlMock as IntlShape);
      const validator = validators.required;
      const result = validator([]);

      expect(result).toHaveLength(1);
      expect(result[0].error).toBe(errorMap.get('required'));
    });
  });

  describe('combineValidators', () => {
    it('returns undefined when all validators report valid', () => {
      const validators = createValidators(intlMock as IntlShape);
      const combined = combineValidators([
        validators.maxLength(10),
        validators.minCount(2),
      ]);

      const result = combined([rdf.literal('value1'), rdf.literal('value2')]);

      expect(result).toBe(undefined);
    });

    it('returns an error when one or more validators report invalid', () => {
      const validators = createValidators(intlMock as IntlShape);
      const combined = combineValidators([
        validators.maxLength(10),
        validators.minCount(2),
      ]);

      const result1 = combined([rdf.literal('value1')]);

      expect(result1).not.toBe(undefined);
      expect(result1).toHaveLength(1);
      //@ts-ignore
      expect(result1[0].error).toBe(errorMap.get('minCount'));

      const result2 = combined([rdf.literal('value1value1value1value1value1value1value1')]);

      expect(result2).toHaveLength(2);
    });
  });
});
