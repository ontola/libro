import React from 'react';

import FormFieldAddButton from './FormFieldAddButton';
import { formFieldContext } from './FormFieldContext';
import FormInput from './FormInput';

const FormInputs = (): JSX.Element | null => {
  const { values } = React.useContext(formFieldContext);

  if (!values) {
    return null;
  }

  return (
    <React.Fragment>
      {values.map((value, index) => (
        <FormInput
          index={index}
          key={index}
          value={value}
        />
      ))}
      <FormFieldAddButton />
    </React.Fragment>
  );
};

export default FormInputs;
