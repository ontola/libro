import React from 'react';

import { isMarkedForRemove } from '../../helpers/forms';

import { FormFieldContext } from './FormField';
import FormFieldAddButton from './FormFieldAddButton';
import FormInput from './FormInput';

const FormInputs = (): JSX.Element | null => {
  const {
    fieldShape,
    values,
  } = React.useContext(FormFieldContext);
  const { maxCount } = fieldShape;

  if (!values) {
    return null;
  }

  const showAddButton = !maxCount || values.filter((val) => !isMarkedForRemove(val)).length < (maxCount || 0);

  return (
    <React.Fragment>
      {values.map((value, index) => (
        <FormInput
          index={index}
          key={index}
          value={value}
        />
      ))}
      {showAddButton && <FormFieldAddButton />}
    </React.Fragment>
  );
};

export default FormInputs;
