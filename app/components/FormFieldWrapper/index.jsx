import { linkType } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { Field } from 'react-final-form';

import { FormSectionContext } from '../Form/FormSection';

const propTypes = {
  field: PropTypes.string.isRequired,
  initialValue: linkType,
  validate: PropTypes.func,
};

const formFieldWrapper = (Component) => {
  const WrappedComp = (props) => {
    const namePrefix = React.useContext(FormSectionContext);
    const name = namePrefix ? `${namePrefix}.${props.field}` : props.field;

    return (
      <Field
        allowNull
        initialValue={props.initialValue}
        name={name}
        parse={null}
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
