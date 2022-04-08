import DayJSUtils from '@date-io/dayjs';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { makeStyles } from '@material-ui/styles';
import rdf from '@ontologies/core';
import * as xsd from '@ontologies/xsd';
import clsx from 'clsx';
import React from 'react';
import { useIntl } from 'react-intl';

import { FormTheme, formContext } from '../../components/Form/FormContext';
import { formFieldContext } from '../../components/FormField/FormFieldContext';
import { InputComponentProps } from '../../components/FormField/FormFieldTypes';
import HiddenRequiredInput from '../../components/Input/HiddenRequiredInput';
import { SHADOW_LIGHT } from '../../helpers/flow';
import { LibroTheme } from '../../themes/themes';
import { formMessages } from '../../translations/messages';

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

const DateTimePickerComponent: React.FC<InputComponentProps> = ({
  inputValue,
  onChange,
}) => {
  const intl = useIntl();
  const classes = useStyles();
  const theme = useTheme<LibroTheme>();
  const screenIsWide = useMediaQuery(theme.breakpoints.up('md'));
  const { theme: formTheme } = React.useContext(formContext);
  const {
    fieldShape,
    name,
    onBlur,
    onFocus,
  } = React.useContext(formFieldContext);

  const showStatic = formTheme === FormTheme.Flow && screenIsWide;
  const value = inputValue.value?.length > 0 ? inputValue.value : null;
  const className = clsx({
    [classes.flowDatePicker]: showStatic,
  });

  return (
    <MuiPickersUtilsProvider
      utils={DayJSUtils}
    >
      {fieldShape.required && (
        <HiddenRequiredInput
          name={name}
          value={value}
        />
      )}
      <div className={className}>
        <DateTimePicker
          autoOk
          showTodayButton
          ampm={false}
          cancelLabel={intl.formatMessage(formMessages.cancelLabel)}
          clearLabel={intl.formatMessage(formMessages.clearLabel)}
          clearable={!!inputValue.value}
          format="D MMMM YYYY HH:mm"
          id={name}
          inputVariant="outlined"
          invalidDateMessage={intl.formatMessage(formMessages.invalidDateMessage)}
          invalidLabel={intl.formatMessage(formMessages.invalidLabel)}
          margin="dense"
          maxDateMessage={intl.formatMessage(formMessages.maxDateMessage)}
          minDateMessage={intl.formatMessage(formMessages.minDateMessage)}
          okLabel={intl.formatMessage(formMessages.okLabel)}
          todayLabel={intl.formatMessage(formMessages.todayLabel)}
          value={value}
          variant={showStatic ? 'static' : 'dialog'}
          onBlur={onBlur}
          onChange={(e) => onChange(e === null ? null : rdf.literal(e.format(), xsd.dateTime))}
          onFocus={onFocus}
        />
      </div>
    </MuiPickersUtilsProvider>
  );
};

export default DateTimePickerComponent;
