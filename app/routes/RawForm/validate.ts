import { AnyObject } from 'final-form';
import { getObjectKeys } from './helpers';

export const validate = (values: AnyObject) => {
  const errors: AnyObject = {};

  const predicateKeys = Object.keys(values)
    .filter((key) => !key.includes('_') && key.startsWith('p'));

  predicateKeys.forEach((predicateKey) => {
    const objectKeys = getObjectKeys(values, predicateKey);
    objectKeys.forEach((objectKey) => {
      if (!values[`${objectKey}_delete`]) {
        if (!values[objectKey]) {
          errors[objectKey] = 'Required';
        }
        if (!values[`${objectKey}_dataType`]) {
          errors[`${objectKey}_dataType`] = 'Required';
        }
      }
    });
  });

  return errors;
};

export default validate;
