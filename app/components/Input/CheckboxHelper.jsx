import schema from '@ontologies/schema';
import { useProperty } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import FieldHelper from '../FormField/FieldHelper';

const CheckboxHelper = ({
  error,
  variant,
}) => {
  const [description] = useProperty(schema.text);

  return (
    <FieldHelper
      error={error}
      helperText={description?.value}
      variant={variant}
    />
  );
};

CheckboxHelper.propTypes = {
  error: PropTypes.string,
  variant: PropTypes.string,
};

export default CheckboxHelper;
