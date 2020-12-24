import PropTypes from 'prop-types';
import React from 'react';

import FieldLabel from '../FieldLabel';
import { FormContext } from '../Form/Form';

const FormFieldLabel = ({
  label,
  name,
  required,
}) => {
  const { theme } = React.useContext(FormContext);

  return (
    <FieldLabel
      hidden={theme === 'preview'}
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
};

export default FormFieldLabel;
