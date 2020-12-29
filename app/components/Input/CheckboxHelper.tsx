import schema from '@ontologies/schema';
import { useProperty } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { FormFieldError } from '../FormField';
import FieldHelper from '../FormField/FieldHelper';

interface PropTypes {
  error: FormFieldError;
}

const CheckboxHelper: React.FC<PropTypes> = ({
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

export default CheckboxHelper;