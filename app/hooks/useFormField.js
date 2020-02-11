import React from 'react';
import { useField } from 'react-final-form';

import { FormContext } from '../components/Form/Form';
import { FormSectionContext } from '../components/Form/FormSection';
import { arraysEqual } from '../helpers/data';

import { usePersistence } from './usePersistence';

const useFormField = ({
  initialValue,
  field,
  validate,
  type,
  sessionStore,
}) => {
  const storeKey = React.useContext(FormContext);
  const namePrefix = React.useContext(FormSectionContext);
  const name = namePrefix ? `${namePrefix}.${field}` : field;
  const storageKey = `${storeKey}.${name}`;

  const [defaultStorageValue, setStorageValue] = usePersistence(
    __CLIENT__ ? (sessionStore || sessionStorage) : undefined,
    storageKey
  );
  const [currentDefaultValue, setCurrentDefaultValue] = React.useState(defaultStorageValue);

  React.useEffect(() => {
    setCurrentDefaultValue(defaultStorageValue);
  }, [name, initialValue]);
  const setDefaultValue = ['password', 'hidden'].includes(type)
    ? () => undefined
    : setStorageValue;

  const formProps = useField(name, {
    allowNull: true,
    defaultValue: currentDefaultValue,
    format: (i) => i,
    initialValue: currentDefaultValue ? undefined : initialValue,
    parse: (i) => i,
    validate,
  });

  const valueChanged = (oldValue, newValue) => {
    if (Array.isArray(newValue)) {
      return !arraysEqual(oldValue, newValue);
    }

    return oldValue !== newValue;
  };

  const input = {
    ...formProps.input,
    onChange: (nextValue) => {
      if (storeKey
        && (formProps.meta.touched || valueChanged(nextValue, formProps.input.value))) {
        setDefaultValue(nextValue);
      }
      formProps.input.onChange(nextValue);
    },
  };

  return [input, formProps, storeKey];
};

export default useFormField;
