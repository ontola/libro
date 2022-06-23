/* eslint-disable @typescript-eslint/no-magic-numbers */
import rdf from '@ontologies/core';
import { IntlShape, MessageDescriptor } from 'react-intl';

import { validationMessages } from '../messages';
import {
  combineValidators,
  createValidator,
  validatorMap,
} from '../validators';

const errorMap = new Map([
  ['maxCount', validationMessages.maxCount.id],
  ['maxLength', validationMessages.maxLength.id],
  ['minCount', validationMessages.minCount.id],
  ['minLength', validationMessages.minLength.id],
  ['pattern', validationMessages.pattern.id],
  ['required', validationMessages.required.id],
]);

const intlMock = {
  formatMessage: (descriptor: MessageDescriptor) => descriptor.id,
} as IntlShape;

describe('Validators', () => {
  describe('maxCount', () => {
    const validator = createValidator(intlMock, validatorMap.maxCount(2));

    it('returns an empty array on valid count', () => {
      const result = validator([rdf.literal('value1')]);

      expect(result).toHaveLength(0);
    });

    it('returnes error message on invalid input', () => {
      const result = validator([rdf.literal('value1'), rdf.literal('value2'), rdf.literal('value3')]);

      expect(result).toHaveLength(1);
      expect(result[0].error).toBe(errorMap.get('maxCount'));
    });
  });

  describe('maxLength', () => {
    const validator = createValidator(intlMock, validatorMap.maxLength(10));

    it('returns an empty array when input is valid', () => {
      const result = validator([rdf.literal('value1')]);

      expect(result).toHaveLength(0);
    });

    it('returns an error when input is invalid', () => {
      const result = validator([rdf.literal('A sentence which very being trencends the translation of the concrete into the abstractness that is communication.')]);

      expect(result).toHaveLength(1);
      expect(result[0].error).toBe(errorMap.get('maxLength'));
    });
  });

  describe('minCount', () => {
    const validator = createValidator(intlMock, validatorMap.minCount(2));

    it('returns an empty array when the amount of values is higher or equal to the configured min count', () => {
      const result = validator([rdf.literal('value1'), rdf.literal('value2')]);

      expect(result).toHaveLength(0);
    });

    it('returns an error when the amount of values given is lower than the configured min count', () => {
      const result = validator([rdf.literal('value1')]);

      expect(result).toHaveLength(1);
      expect(result[0].error).toBe(errorMap.get('minCount'));
    });
  });

  describe('minLength', () => {
    const validator = createValidator(intlMock, validatorMap.minLength(10));

    it('returns an empty array when the values length is equal or larger than the configured minimum length', () => {
      const result = validator([rdf.literal('A very long sentence')]);

      expect(result).toHaveLength(0);
    });

    it('returns an error when the values length is smaller than the configured minimum length', () => {
      const result = validator([rdf.literal('Mand!')]);

      expect(result).toHaveLength(1);
      expect(result[0].error).toBe(errorMap.get('minLength'));
    });
  });

  describe('pattern', () => {
    const validator = createValidator(intlMock, validatorMap.pattern(/^[a-zA-Z0-9]*$/));

    it('returns an empty array when the value matches the configured pattern', () => {
      const result = validator([rdf.literal('abc123')]);

      expect(result).toHaveLength(0);
    });
    it('returns an error when the value does not match the configured pattern', () => {
      const result = validator([rdf.literal('&82s()f')]);

      expect(result).toHaveLength(1);
      expect(result[0].error).toBe(errorMap.get('pattern'));
    });

  });

  describe('required', () => {
    const validator = createValidator(intlMock, validatorMap.required());

    it('returns an empty array when the value is not empty', () => {
      const result = validator([rdf.literal('value')]);

      expect(result).toHaveLength(0);
    });

    it('returns an error when the value is empty', () => {
      const result = validator([rdf.literal('')]);

      expect(result).toHaveLength(1);
      expect(result[0].error).toBe(errorMap.get('required'));
    });
  });

  describe('multiple values', () => {
    const validator = createValidator(intlMock, validatorMap.maxLength(6));

    it('returns undefined when all values are valid', () => {
      const result = validator([rdf.literal('value1'), rdf.literal('value2')]);
      expect(result).toHaveLength(0);
    });

    it('returns undefined when multiple values are invalid', () => {
      const result = validator([rdf.literal('value1x'), rdf.literal('value2x')]);

      expect(result).toHaveLength(2);
      expect(result[0].error).toBe(errorMap.get('maxLength'));
      expect(result[0].index).toBe(0);
      expect(result[1].error).toBe(errorMap.get('maxLength'));
      expect(result[1].index).toBe(1);
    });
  });

  describe('combineValidators', () => {
    const combined = combineValidators(intlMock, [
      validatorMap.maxLength(10),
      validatorMap.minCount(2),
      validatorMap.pattern(/^[a-zA-Z0-9]*$/),
    ]);

    it('returns undefined when all validators report valid', () => {
      const result = combined([rdf.literal('value1'), rdf.literal('value2')]);

      expect(result).toBe(undefined);
    });

    it('returns an error when one validators report invalid', () => {
      const result = combined([rdf.literal('value1')]);

      expect(result).not.toBe(undefined);
      expect(result).toHaveLength(1);
      expect(result![0].error).toBe(errorMap.get('minCount'));
    });

    it('returns an error when multiple validators report invalid', () => {
      const result = combined([rdf.literal('value1value1value1value1value1value1value1!')]);
      expect(result).toHaveLength(3);
      expect(result![0].error).toBe(errorMap.get('maxLength'));
      expect(result![0].index).toBe(0);
      expect(result![1].error).toBe(errorMap.get('minCount'));
      expect(result![1].index).toBe(undefined);
      expect(result![2].error).toBe(errorMap.get('pattern'));
      expect(result![2].index).toBe(0);
    });
  });
});
