import schema from '@ontologies/schema';
import { useProperty } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import FieldHelper from '../FormField/FieldHelper';

const CheckboxHelper = ({
  error,
}) => {
  const [description] = useProperty(schema.text);

  return (
    <FieldHelper
      error={error}
      helperText={description?.value}
    />
  );
};

CheckboxHelper.propTypes = {
  error: PropTypes.string,
};

export default CheckboxHelper;
