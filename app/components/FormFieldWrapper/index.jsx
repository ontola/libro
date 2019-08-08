import { linkType } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { useField } from 'react-final-form';

import { usePersistence } from '../../hooks/usePersistence';
import { FormContext } from '../Form/Form';
import { FormSectionContext } from '../Form/FormSection';

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

    const [defaultValue, _setValue] = usePersistence(
      __CLIENT__ ? (props.sessionStorage || sessionStorage) : undefined,
      storageKey
    );
    const setDefaultValue = ['password', 'hidden'].includes(props.type)
      ? () => undefined
      : _setValue;

    const formProps = useField(name, {
      allowNull: true,
      defaultValue,
      format: i => i,
      initialValue: props.initialValue,
      parse: i => i,
      validate: props.validate,
    });

    return (
      <Component
        {...props}
        {...formProps}
        input={{
          ...formProps.input,
          onChange: (nextValue) => {
            if (storeKey
              && (formProps.meta.touched || nextValue !== formProps.input.value)) {
              setDefaultValue(nextValue);
            }
            formProps.input.onChange(nextValue);
          },
        }}
      />
    );
  };

  WrappedComp.displayName = `FormFieldWrapper(${Component.displayName})`;
  WrappedComp.propTypes = propTypes;

  return WrappedComp;
};

formFieldWrapper.displayName = 'formFieldWrapper';

export default formFieldWrapper;
