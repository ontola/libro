import DayJSUtils from '@date-io/dayjs';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { makeStyles } from '@material-ui/styles';
import rdf from '@ontologies/core';
import * as xsd from '@ontologies/xsd';
import clsx from 'clsx';
import React from 'react';
import { useIntl } from 'react-intl';

import { FormContext, FormTheme } from '../../components/Form/Form';
import { FormFieldContext } from '../../components/FormField/FormField';
import { InputComponentProps } from '../../components/FormField/InputComponentProps';
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

const DatePickerComponent: React.FC<InputComponentProps> = ({
  inputValue,
  onChange,
}) => {
  const intl = useIntl();
  const classes = useStyles();
  const theme = useTheme<LibroTheme>();
  const mdUp = useMediaQuery(theme.breakpoints.up('md'));
  const { theme: formTheme } = React.useContext(FormContext);
  const {
    fieldShape,
    name,
  } = React.useContext(FormFieldContext);

  const value = inputValue.value?.length > 0 ? inputValue.value : null;
  const className = clsx({
    [classes.flowDatePicker]: formTheme === FormTheme.Flow && mdUp,
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
        <DatePicker
          autoOk
          showTodayButton
          cancelLabel={intl.formatMessage(formMessages.cancelLabel)}
          clearLabel={intl.formatMessage(formMessages.clearLabel)}
          clearable={!!inputValue.value}
          format="D MMMM YYYY"
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
          onChange={(e) => onChange(e === null ? null : rdf.literal(e.format(), xsd.date))}
        />
      </div>
    </MuiPickersUtilsProvider>
  );
};

export default DatePickerComponent;
