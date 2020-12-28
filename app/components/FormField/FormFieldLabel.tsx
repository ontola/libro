import React from 'react';

import FieldLabel from '../FieldLabel';
import { FormContext } from '../Form/Form';

interface PropTypes {
  label: string | React.ReactNode;
  name: string;
  required: boolean;

}
const FormFieldLabel = ({
  label,
  name,
  required,
}: PropTypes) => {
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

export default FormFieldLabel;
