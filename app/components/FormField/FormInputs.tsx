import React from 'react';

import { isMarkedForRemove } from '../../helpers/forms';

import { FormFieldContext } from './FormField';
import FormFieldAddButton from './FormFieldAddButton';
import FormInput from './FormInput';
import SortableFormInput from './SortableFormInput';

const FormInputs = (): JSX.Element | null => {
  const {
    fieldShape,
    sortable,
    values,
  } = React.useContext(FormFieldContext);
  const { maxCount } = fieldShape;

  if (!values) {
    return null;
  }

  const showAddButton = !maxCount || values.filter((val) => !isMarkedForRemove(val)).length < (maxCount || 0);
  const Component = sortable ? SortableFormInput : FormInput;

  return (
    <React.Fragment>
      {values.map((value, index) => ((
        <Component
          index={index}
          key={index}
          value={value}
        />
      )))}
      {showAddButton && <FormFieldAddButton />}
    </React.Fragment>
  );
};

export default FormInputs;
