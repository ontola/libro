import React from 'react';
import { useField } from 'react-final-form';

import { FormContext } from '../components/Form/Form';
import { FormSectionContext } from '../components/Form/FormSection';
import { arraysEqual } from '../helpers/data';
import { calculateFormFieldName } from '../helpers/forms';

import { usePersistence } from './usePersistence';

const useFormField = ({
  initialValue,
  validate,
  path,
  type,
  sessionStore,
}) => {
  const fieldName = calculateFormFieldName(React.useContext(FormSectionContext), path);

  const storeKey = React.useContext(FormContext);
  const storageKey = `${storeKey}.${fieldName}`;

  const [defaultStorageValue, setStorageValue] = usePersistence(
    __CLIENT__ ? (sessionStore || sessionStorage) : undefined,
    storageKey
  );
  const [currentDefaultValue, setCurrentDefaultValue] = React.useState(defaultStorageValue);
  const [currentInitialValue, setCurrentInitialValue] = React.useState(initialValue);

  React.useEffect(() => {
    setCurrentDefaultValue(defaultStorageValue);
    setCurrentInitialValue(initialValue);
  }, [fieldName, ...(initialValue || [])]);
  const setDefaultValue = ['password', 'hidden'].includes(type)
    ? () => undefined
    : setStorageValue;

  const formProps = useField(fieldName, {
    allowNull: true,
    defaultValue: currentDefaultValue,
    format: (i) => i,
    initialValue: currentDefaultValue ? undefined : currentInitialValue,
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
