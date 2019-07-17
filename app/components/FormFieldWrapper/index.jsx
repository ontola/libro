import { linkType } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { useField } from 'react-final-form';

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
    const formProps = useField(name, {
      allowNull: true,
      format: i => i,
      initialValue: props.initialValue,
      parse: i => i,
      validate: props.validate,
    });

    return (
      <Component
        {...props}
        {...formProps}
      />
    );
  };

  WrappedComp.displayName = `FormFieldWrapper(${Component.displayName})`;
  WrappedComp.propTypes = propTypes;

  return WrappedComp;
};

export default formFieldWrapper;
