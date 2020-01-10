import { linkType } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { useField } from 'react-final-form';

import { usePersistence } from '../../hooks/usePersistence';
import { FormContext } from '../Form/Form';
import { FormSectionContext } from '../Form/FormSection';
import { arraysEqual } from '../../helpers/data';

const propTypes = {
  field: PropTypes.string.isRequired,
  initialValue: linkType,
  sessionStorage: PropTypes.shape({
    getItem: PropTypes.func,
    setItem: PropTypes.func,
  }),
  type: PropTypes.string.isRequired,
  validate: PropTypes.func,
};

const formFieldWrapper = (Component) => {
  const WrappedComp = (props) => {
    const storeKey = React.useContext(FormContext);
    const namePrefix = React.useContext(FormSectionContext);
    const name = namePrefix ? `${namePrefix}.${props.field}` : props.field;
    const storageKey = `${storeKey}.${name}`;

    const [defaultStorageValue, setStorageValue] = usePersistence(
      __CLIENT__ ? (props.sessionStorage || sessionStorage) : undefined,
      storageKey
    );
    const [currentDefaultValue, setCurrentDefaultValue] = React.useState(defaultStorageValue);

    React.useEffect(() => {
      setCurrentDefaultValue(defaultStorageValue);
    }, [name]);
    const setDefaultValue = ['password', 'hidden'].includes(props.type)
      ? () => undefined
      : setStorageValue;

    const formProps = useField(name, {
      allowNull: true,
      defaultValue: currentDefaultValue,
      format: (i) => i,
      initialValue: props.initialValue,
      parse: (i) => i,
      validate: props.validate,
    });

    const valueChanged = (oldValue, newValue) => {
      if (Array.isArray(newValue)) {
        return !arraysEqual(oldValue, newValue);
      }

      return oldValue !== newValue;
    };

    return (
      <Component
        {...props}
        {...formProps}
        input={{
          ...formProps.input,
          onChange: (nextValue) => {
            if (storeKey
              && (formProps.meta.touched || valueChanged(nextValue, formProps.input.value))) {
              setDefaultValue(nextValue);
            }
            formProps.input.onChange(nextValue);
          },
        }}
        storeKey={storeKey}
      />
    );
  };

  WrappedComp.displayName = `FormFieldWrapper(${Component.displayName})`;
  WrappedComp.propTypes = propTypes;

  return WrappedComp;
};

formFieldWrapper.displayName = 'formFieldWrapper';

export default formFieldWrapper;
