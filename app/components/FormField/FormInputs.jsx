import rdf, { isNamedNode } from '@ontologies/core';
import { linkType, topologyType } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import FontAwesome from 'react-fontawesome';

import { destroyFieldName, isMarkedForRemove } from '../../helpers/forms';
import Button from '../Button';
import CheckboxesInput from '../CheckboxesInput';

import FormFieldAddButton from './FormFieldAddButton';
import InputElement from './InputElement';
import OptionsWrapper from './OptionsWrapper';

import { formFieldError } from './index';

const FormInputs = (props) => {
  const {
    addItem,
    allErrs,
    autofocus,
    description,
    input,
    label,
    maxCount,
    maxLength,
    meta,
    minCount,
    renderHelper: HelperRenderer,
    required,
    shIn,
    topology,
    type,
    values,
    variant,
  } = props;
  const {
    dirtySinceLastSubmit,
    pristine,
  } = meta;

  if (!values) {
    return null;
  }
  const removable = (minCount !== 1 || maxCount > 1);

  if (type === 'checkboxes') {
    return (
      <OptionsWrapper
        Component={CheckboxesInput}
        componentProps={{
          onChange: input.onChange,
          required,
          values: input.value,
        }}
        shIn={shIn}
        topology={topology}
      />
    );
  }

  return (
    <React.Fragment>
      {(values.map((value, index) => {
        if (isMarkedForRemove(value)) {
          return null;
        }
        const removeItem = () => {
          const newValue = input.value?.slice() || [];
          if (isNamedNode(newValue[index]['@id'])) {
            newValue[index][destroyFieldName] = rdf.literal(true);
          } else {
            newValue.splice(index, 1);
          }

          input.onChange(newValue);
        };

        const errors = allErrs?.filter((err) => err?.index === index);

        return (
          <div className="Field__wrapper" key={[input.name, index].join('.')}>
            <InputElement
              {...props}
              autofocus={autofocus && index === 0}
              errors={errors}
              inputIndex={index}
              inputValue={value}
              variant={variant}
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
            <HelperRenderer
              description={description}
              error={(dirtySinceLastSubmit || pristine) ? undefined : errors}
              maxLength={maxLength}
              required={required}
              value={value}
              variant={variant}
            />
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
  allErrs: PropTypes.arrayOf(formFieldError),
  autofocus: PropTypes.bool,
  description: PropTypes.string,
  input: PropTypes.shape({
    name: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    value: PropTypes.arrayOf(linkType),
  }),
  label: PropTypes.string,
  maxCount: PropTypes.number,
  maxLength: PropTypes.number,
  meta: PropTypes.shape({
    active: PropTypes.bool,
    dirty: PropTypes.bool,
    dirtySinceLastSubmit: PropTypes.bool,
    error: PropTypes.arrayOf(formFieldError),
    invalid: PropTypes.bool,
    pristine: PropTypes.bool,
    touched: PropTypes.bool,
  }),
  minCount: PropTypes.number,
  renderHelper: PropTypes.func,
  required: PropTypes.bool,
  shIn: linkType,
  topology: topologyType,
  type: PropTypes.string,
  values: PropTypes.arrayOf(linkType),
  variant: PropTypes.string,
};

export default FormInputs;
