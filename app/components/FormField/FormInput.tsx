import { makeStyles } from '@mui/styles';
import rdf, { isTerm } from '@ontologies/core';
import clsx from 'clsx';
import React from 'react';
import FontAwesome from 'react-fontawesome';

import { SortableProps } from '../../containers/Sortable';
import { isMarkedForRemove } from '../../helpers/forms';
import { LibroTheme } from '../../themes/themes';
import Button from '../Button';

import { formFieldContext } from './FormFieldContext';
import FormFieldHelper from './FormFieldHelper';
import { InputValue } from './FormFieldTypes';
import FormInputButtons from './FormInputButtons';

export const fieldWrapperCID = 'CID-FieldWrapper';

export interface FormInputProps {
  index: number;
  sortableProps?: SortableProps;
  value: InputValue;
}

const useStyles = makeStyles<LibroTheme>(() => ({
  fieldWrapper: {
    display: 'inline-block',
    position: 'relative',
  },
}));

const FormInput: React.FC<FormInputProps> = ({
  index,
  value,
  sortableProps,
}) => {
  const {
    inputErrors,
    autofocus,
    fieldShape,
    inputComponent: InputComponent,
    onChange,
    removeItem,
    values,
  } = React.useContext(formFieldContext);
  const { removable } = fieldShape;
  const classes = useStyles();

  const inputOnChange = React.useCallback((val: InputValue) => {
    const newValue = values?.slice() || [];
    newValue[index] = isTerm(val) ? val : rdf.literal(val ?? '');
    onChange(newValue);
  }, [values, index, onChange]);

  const errors = React.useMemo(() => (
    inputErrors.filter((err) => err?.index === index)
  ), [inputErrors, index]);

  if (isMarkedForRemove(value)) {
    return null;
  }

  return (
    <div
      className={clsx(fieldWrapperCID, classes.fieldWrapper)}
      ref={sortableProps?.setNodeRef}
      style={sortableProps?.style}
    >
      <InputComponent
        autofocus={!!autofocus && (index === 0)}
        errors={errors}
        inputIndex={index}
        inputValue={value}
        onChange={inputOnChange}
      />
      <FormInputButtons>
        {removable && (
          <Button
            plain
            onClick={() => removeItem(index)}
          >
            <FontAwesome name="times" />
          </Button>
        )}
        {sortableProps && (
          <div
            {...sortableProps.listeners}
            {...sortableProps.attributes}
          >
            <FontAwesome name="arrows" />
          </div>
        )}
      </FormInputButtons>
      <FormFieldHelper
        error={errors?.[0]}
        value={value}
      />
    </div>
  );
};

export default FormInput;
