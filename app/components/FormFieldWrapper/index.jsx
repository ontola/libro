import PropTypes from 'prop-types';
import React from 'react';
import { Field } from 'react-final-form';

import { FormSectionContext } from '../Form/FormSection';

const propTypes = {
  field: PropTypes.string.isRequired,
  validate: PropTypes.func,
};

const formFieldWrapper = (Component) => {
  const WrappedComp = (props) => {
    const namePrefix = React.useContext(FormSectionContext);
    const name = namePrefix ? `${namePrefix}.${props.field}` : props.field;

    return (
      <Field
        name={name}
        validate={props.validate}
      >
        {formProps => (
          <Component
            {...props}
            {...formProps}
          />
        )}
      </Field>
    );
  };

  WrappedComp.displayName = `FormFieldWrapper(${Component.displayName})`;
  WrappedComp.propTypes = propTypes;

  return WrappedComp;
};

export default formFieldWrapper;
