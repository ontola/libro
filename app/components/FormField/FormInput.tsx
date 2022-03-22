import { makeStyles } from '@material-ui/styles';
import rdf, {
  isNamedNode,
  isTerm,
} from '@ontologies/core';
import clsx from 'clsx';
import React from 'react';
import FontAwesome from 'react-fontawesome';

import {
  destroyFieldName,
  isMarkedForRemove,
  retrieveIdFromValue,
} from '../../helpers/forms';
import { isJSONLDObject } from '../../helpers/types';
import { InputValue } from '../../hooks/useFormField';
import { LibroTheme } from '../../themes/themes';
import Button from '../Button';

import { FormFieldContext } from './FormField';
import FormFieldHelper from './FormFieldHelper';

export const fieldWrapperCID = 'CID-FieldWrapper';

interface FormInputProps {
  index: number;
  value: InputValue;
}

const useStyles = makeStyles<LibroTheme>((theme) => ({
  fieldInputRemoveButton: {
    color: theme.palette.grey.midDark,
    fontSize: theme.typography.fontSizes.xLarge,
    padding: '0 0.5rem 0.5rem',
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 11,
  },
  fieldWrapper: {
    display: 'inline-block',
    position: 'relative',
  },
}));

const FormInput: React.FC<FormInputProps> = ({
  index,
  value,
}) => {
  const {
    inputErrors,
    autofocus,
    fieldShape,
    inputComponent: InputComponent,
    name,
    onChange,
    values,
  } = React.useContext(FormFieldContext);
  const { removable } = fieldShape;
  const classes = useStyles();

  const removeItem = React.useCallback(() => {
    const newValue = values?.slice() || [];
    const curentValue = newValue[index];

    if (isJSONLDObject(curentValue) && isNamedNode(retrieveIdFromValue(curentValue))) {
      curentValue[destroyFieldName] = rdf.literal(true);
    } else {
      newValue.splice(index, 1);
    }

    onChange(newValue);
  }, [values, index, onChange]);
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
      key={[name, index].join('.')}
    >
      <InputComponent
        autofocus={!!autofocus && (index === 0)}
        errors={errors}
        inputIndex={index}
        inputValue={value}
        onChange={inputOnChange}
      />
      {removable && (
        <Button
          plain
          className={classes.fieldInputRemoveButton}
          onClick={removeItem}
        >
          <FontAwesome name="times" />
        </Button>
      )}
      <FormFieldHelper
        error={errors?.[0]}
        value={value}
      />
    </div>
  );
};

export default FormInput;
