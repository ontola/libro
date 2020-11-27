import PropTypes from 'prop-types';
import React from 'react';

import FieldLabel from '../FieldLabel';

const FormFieldLabel = ({
  label,
  name,
  required,
  theme,
}) => (
  <FieldLabel
    hidden={theme === 'omniform'}
    htmlFor={name}
    label={label}
    required={required}
  />
);

FormFieldLabel.propTypes = {
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  name: PropTypes.string,
  required: PropTypes.bool,
  theme: PropTypes.string,
};

export default FormFieldLabel;
