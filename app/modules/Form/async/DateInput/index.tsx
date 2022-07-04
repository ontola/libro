import {
  LocalizationProvider,
  MobileDatePicker,
  MobileDateTimePicker,
} from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {
  TextField,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { TextFieldProps as MuiTextFieldPropsType } from '@mui/material/TextField/TextField';
import { makeStyles } from '@mui/styles';
import rdf from '@ontologies/core';
import * as xsd from '@ontologies/xsd';
import clsx from 'clsx';
import React from 'react';
import { useIntl } from 'react-intl';

import { BreakPoints, LibroTheme } from '../../../Common/theme/types';
import { formMessages } from '../../../../translations/messages';
import { SHADOW_LIGHT } from '../../../Common/lib/flow';
import { DateInputProps, DateInputType } from '../../components/DateInput';
import { FormTheme, formContext } from '../../components/Form/FormContext';
import { formFieldContext } from '../../components/FormField/FormFieldContext';
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

const renderInput = (params: MuiTextFieldPropsType) => (
  <TextField
    {...params}
    fullWidth
  />
);

const DateInput: React.FC<DateInputProps> = ({
  type,
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

  const dataType = type === DateInputType.Date ? xsd.date : xsd.dateTime;
  const handleChange = React.useCallback(
    (newValue) => onChange(newValue === null ? null : rdf.literal(newValue, dataType)),
    [],
  );

  const showStatic = formTheme === FormTheme.Flow && screenIsWide;
  const value = inputValue.value?.length > 0 ? inputValue.value : null;
  const className = clsx({
    [classes.flowDatePicker]: showStatic,
  });
  const Component = type === DateInputType.Date ? MobileDatePicker : MobileDateTimePicker;
  const props = type === DateInputType.Date ? {
    format: 'd MMMM yyyy',
  } : {
    format: 'd MMMM yyyy HH:mm',
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      {fieldShape.required && (
        <HiddenRequiredInput
          name={name}
          value={value}
        />
      )}
      <div className={className}>
        <Component
          disableMaskedInput
          showTodayButton
          cancelText={intl.formatMessage(formMessages.cancelLabel)}
          clearText={intl.formatMessage(formMessages.clearLabel)}
          clearable={!!inputValue.value}
          okText={intl.formatMessage(formMessages.okLabel)}
          orientation={showStatic ? 'landscape' : 'portrait'}
          renderInput={renderInput}
          todayText={intl.formatMessage(formMessages.todayLabel)}
          value={value}
          onChange={handleChange}
          {...props}
        />
      </div>
    </LocalizationProvider>
  );
};

export default DateInput;
