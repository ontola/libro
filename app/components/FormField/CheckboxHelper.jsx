import PropTypes from 'prop-types';
import React from 'react';

import FieldHelper from './FieldHelper';

const CheckboxHelper = ({
  error,
  description,
  variant,
}) => (
  <FieldHelper
    error={error}
    helperText={description}
    variant={variant}
  />
);

CheckboxHelper.propTypes = {
  description: PropTypes.string,
  error: PropTypes.string,
  variant: PropTypes.string,
};

export default CheckboxHelper;
