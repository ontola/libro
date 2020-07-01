import PropTypes from 'prop-types';
import React from 'react';

import FieldLabel from '../FieldLabel';

const FormFieldLabel = ({
  label,
  name,
  required,
  theme,
  type,
}) => {
  if (type === 'checkbox' || !label) {
    return null;
  }

  return (
    <FieldLabel
      hidden={theme === 'omniform'}
      htmlFor={name}
      label={label}
      required={required}
    />
  );
};

FormFieldLabel.propTypes = {
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  name: PropTypes.string,
  required: PropTypes.bool,
  theme: PropTypes.string,
  type: PropTypes.string,
};

export default FormFieldLabel;
