import rdf, { isNamedNode, isTerm, SomeTerm } from '@ontologies/core';
import PropTypes from 'prop-types';
import React from 'react';
import FontAwesome from 'react-fontawesome';

import { destroyFieldName, isMarkedForRemove, retrieveIdFromValue } from '../../helpers/forms';
import { isJSONLDObject } from '../../helpers/types';
import { InputValue } from '../../hooks/useFormField';
import { ShapeForm } from '../../hooks/useShapeProps';
import Button from '../Button';

import FormFieldAddButton from './FormFieldAddButton';
import { FormFieldError, InputMeta } from './index';

interface PropTypes {
  addItem: () => any;
  autofocus?: boolean;
  combinedComponent?: boolean;
  description?: string;
  field?: SomeTerm;
  fieldShape: ShapeForm;
  formIRI?: SomeTerm;
  inputComponent: (args: any) => any;
  inputErrors?: FormFieldError[];
  label?: string | React.ReactNode;
  meta: InputMeta;
  name: string;
  onChange: (e: any) => any;
  path?: SomeTerm;
  placeholder?: string;
  renderHelper?: (args: any) => any;
  topology?: SomeTerm;
  type?: string;
  values?: InputValue[];
}

const FormInputs = (props: PropTypes) => {
  const {
    addItem,
    inputErrors,
    autofocus,
    combinedComponent,
    description,
    fieldShape,
    inputComponent: InputComponent,
    label,
    meta,
    name,
    onChange,
    renderHelper: HelperRenderer,
    values,
  } = props;
  const {
    maxCount,
    maxLength,
    removable,
    required,
  } = fieldShape;
  const {
    dirtySinceLastSubmit,
    pristine,
  } = meta;

  if (!values) {
    return null;
  }

  if (!combinedComponent) {
    return <InputComponent {...props} />;
  }

  return (
    <React.Fragment>
      {(values.map((value, index) => {
        if (isMarkedForRemove(value)) {
          return null;
        }
        const removeItem = () => {
          const newValue = values?.slice() || [];
          const curentValue = newValue[index];
          if (isJSONLDObject(curentValue) && isNamedNode(retrieveIdFromValue(curentValue))) {
            curentValue[destroyFieldName] = rdf.literal(true);
          } else {
            newValue.splice(index, 1);
          }

          onChange(newValue);
        };
        const inputOnChange = (val: InputValue) => {
          const newValue = values?.slice() || [];
          newValue[index] = isTerm(val) ? val : rdf.literal(val || '');
          onChange(newValue);
        };

        const errors = inputErrors?.filter((err) => err?.index === index);

        return (
          <div className="Field__wrapper" key={[name, index].join('.')}>
            <InputComponent
              {...props}
              autofocus={autofocus && index === 0}
              errors={errors}
              id={name}
              inputIndex={index}
              inputValue={value}
              name={name}
              onChange={inputOnChange}
            />
            {removable && (
              <Button
                plain
                className="Field__input__remove-button"
                onClick={removeItem}
              >
                <FontAwesome name="times" />
              </Button>
            )}
            {HelperRenderer && (
              <HelperRenderer
                description={description}
                error={(dirtySinceLastSubmit || pristine) ? undefined : errors}
                maxLength={maxLength}
                required={required}
                value={value}
              />
            )}
          </div>
        );
      }))}
      {(!maxCount || values.filter((val) => !isMarkedForRemove(val)).length < maxCount) && (
        <FormFieldAddButton
          addItem={addItem}
          label={label}
        />
      )}
    </React.Fragment>
  );
};

export default FormInputs;
