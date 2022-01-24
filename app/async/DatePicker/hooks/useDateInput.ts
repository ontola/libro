import useMediaQuery from '@material-ui/core/useMediaQuery';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { makeStyles, useTheme } from '@material-ui/styles';
import rdf, { NamedNode } from '@ontologies/core';
import clsx from 'clsx';
import React from 'react';

import { FormContext, FormTheme } from '../../../components/Form/Form';
import { FormFieldContext } from '../../../components/FormField/FormField';
import { SHADOW_LIGHT } from '../../../helpers/flow';
import { InputValue } from '../../../hooks/useFormField';
import { LibroTheme } from '../../../themes/themes';

export interface UseDateInputResult {
  className: string;
  name: string;
  onAccept: () => void;
  orientation: 'portrait' | 'landscape';
  ownOnChange: (e: MaterialUiPickersDate) => void;
  required?: boolean;
  value: string;
  variant: 'static' | 'dialog';
}

const useStyles = makeStyles<LibroTheme>((theme) => ({
  flowDatePicker: {
    '& > div': {
      borderRadius: theme.shape.borderRadius,
      margin: 0,
    },
    '& input': {
      background: 'white',
    },
    boxShadow: SHADOW_LIGHT,
  },
}));

export const useDateInput = (
  inputValue: InputValue,
  valueType: NamedNode,
  onChange: (e: unknown) => void): UseDateInputResult => {
  const classes = useStyles();
  const theme = useTheme<LibroTheme>();
  const mdUp = useMediaQuery(theme.breakpoints.up('md'));

  const { theme: formTheme } = React.useContext(FormContext);

  const {
    fieldShape,
    name,
    onBlur,
    onFocus,
  } = React.useContext(FormFieldContext);

  const ownOnChange = React.useCallback((e: MaterialUiPickersDate) => {
    onFocus();
    onChange(e === null ? null : rdf.literal(e.format(), valueType));
  }, [onChange, onFocus]);

  const onAccept = React.useCallback(() => {
    onBlur();
  }, [onBlur]);
  const showStatic = formTheme === FormTheme.Flow && mdUp;

  const value = inputValue.value?.length > 0 ? inputValue.value : null;

  const className = clsx({
    [classes.flowDatePicker]: showStatic,
  });

  const variant = showStatic ? 'static' : 'dialog';
  const orientation = showStatic ? 'landscape' : 'portrait';

  return {
    className,
    name,
    onAccept,
    orientation,
    ownOnChange,
    required: fieldShape.required,
    value,
    variant,
  };
};
