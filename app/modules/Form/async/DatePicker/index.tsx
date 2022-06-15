import { LocalizationProvider, MobileDatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {
  TextField,
  useMediaQuery,
  useTheme, 
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import rdf from '@ontologies/core';
import * as xsd from '@ontologies/xsd';
import clsx from 'clsx';
import React from 'react';
import { useIntl } from 'react-intl';

import { BreakPoints, LibroTheme } from '../../../../themes/themes';
import { formMessages } from '../../../../translations/messages';
import { SHADOW_LIGHT } from '../../../Common/lib/flow';
import { FormTheme, formContext } from '../../components/Form/FormContext';
import { formFieldContext } from '../../components/FormField/FormFieldContext';
import { InputComponentProps } from '../../components/FormField/FormFieldTypes';
import HiddenRequiredInput from '../../components/Input/HiddenRequiredInput';

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

const DatePickerComponent: React.FC<InputComponentProps> = ({
  inputValue,
  onChange,
}) => {
  const intl = useIntl();
  const classes = useStyles();
  const theme = useTheme<LibroTheme>();
  const screenIsWide = useMediaQuery(theme.breakpoints.up(BreakPoints.Medium));
  const { theme: formTheme } = React.useContext(formContext);
  const {
    fieldShape,
    name,
  } = React.useContext(formFieldContext);

  const showStatic = formTheme === FormTheme.Flow && screenIsWide;
  const value = inputValue.value?.length > 0 ? inputValue.value : null;
  const className = clsx({
    [classes.flowDatePicker]: showStatic,
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      {fieldShape.required && (
        <HiddenRequiredInput
          name={name}
          value={value}
        />
      )}
      <div className={className}>
        <MobileDatePicker
          disableMaskedInput
          showTodayButton
          cancelText={intl.formatMessage(formMessages.cancelLabel)}
          clearText={intl.formatMessage(formMessages.clearLabel)}
          clearable={!!inputValue.value}
          inputFormat="d MMMM yyyy"
          okText={intl.formatMessage(formMessages.okLabel)}
          orientation={showStatic ? 'landscape' : 'portrait'}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
            />
          )}
          todayText={intl.formatMessage(formMessages.todayLabel)}
          value={value}
          onChange={(newDate) => onChange(newDate === null ? null : rdf.literal(newDate, xsd.date))}
        />
      </div>
    </LocalizationProvider>
  );
};

export default DatePickerComponent;
