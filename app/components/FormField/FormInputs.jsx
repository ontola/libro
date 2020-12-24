import rdf, { isNamedNode, isTerm } from '@ontologies/core';
import { linkType, topologyType } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import FontAwesome from 'react-fontawesome';

import { destroyFieldName, isMarkedForRemove } from '../../helpers/forms';
import { fieldShapeType } from '../../hooks/useFormField';
import Button from '../Button';

import FormFieldAddButton from './FormFieldAddButton';

import { formFieldError } from './index';

const FormInputs = (props) => {
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
          if (isNamedNode(newValue[index]['@id'])) {
            newValue[index][destroyFieldName] = rdf.literal(true);
          } else {
            newValue.splice(index, 1);
          }

          onChange(newValue);
        };
        const inputOnChange = (val) => {
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

FormInputs.propTypes = {
  addItem: PropTypes.func,
  autofocus: PropTypes.bool,
  combinedComponent: PropTypes.bool,
  description: PropTypes.string,
  fieldShape: fieldShapeType,
  inputComponent: PropTypes.func,
  inputErrors: PropTypes.arrayOf(formFieldError),
  label: PropTypes.string,
  meta: PropTypes.shape({
    active: PropTypes.bool,
    dirty: PropTypes.bool,
    dirtySinceLastSubmit: PropTypes.bool,
    error: PropTypes.arrayOf(formFieldError),
    invalid: PropTypes.bool,
    pristine: PropTypes.bool,
    touched: PropTypes.bool,
  }),
  name: PropTypes.string,
  onChange: PropTypes.func,
  renderHelper: PropTypes.func,
  topology: topologyType,
  type: PropTypes.string,
  values: PropTypes.arrayOf(linkType),
};

export default FormInputs;
