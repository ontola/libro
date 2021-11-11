import { SomeTerm } from '@ontologies/core';
import { SomeNode } from 'link-lib';
import React, { EventHandler } from 'react';

import { isMarkedForRemove } from '../../helpers/forms';
import { FocusRelatedEventHandler, InputValue } from '../../hooks/useFormField';
import { ShapeForm } from '../../hooks/useShapeProps';

import FormFieldAddButton from './FormFieldAddButton';
import FormInput from './FormInput';

import { FormFieldError, InputMeta } from './';

export interface FormInputsProps {
  addFormValue?: () => any;
  autofocus?: boolean;
  combinedComponent?: boolean;
  description?: string;
  field?: SomeNode;
  fieldShape?: ShapeForm;
  inputComponent: (args: any) => any;
  inputErrors?: FormFieldError[];
  label?: string | React.ReactNode;
  meta?: InputMeta;
  name?: string;
  onBlur: FocusRelatedEventHandler;
  onChange: EventHandler<any>;
  onFocus: FocusRelatedEventHandler;
  path?: SomeNode;
  placeholder?: string;
  renderHelper?: (args: any) => any;
  storeKey?: string;
  topology?: SomeTerm;
  type?: string;
  values?: InputValue[];
}

const FormInputs = (props: FormInputsProps): JSX.Element | null => {
  const {
    addFormValue,
    combinedComponent,
    fieldShape,
    inputComponent: InputComponent,
    label,
    values,
  } = props;
  const { maxCount } = fieldShape || {};

  if (!values) {
    return null;
  }

  if (combinedComponent) {
    return <InputComponent {...props} />;
  }

  const showAddButton = addFormValue && (
    !maxCount || values.filter((val) => !isMarkedForRemove(val)).length < (maxCount || 0)
  );

  return (
    <React.Fragment>
      {values.map((value, index) => (
        <FormInput
          {...props}
          index={index}
          key={index}
          value={value}
        />
      ))}
      {showAddButton && (
        <FormFieldAddButton
          addFormValue={addFormValue!}
          label={label}
        />
      )}
    </React.Fragment>
  );
};

export default FormInputs;
