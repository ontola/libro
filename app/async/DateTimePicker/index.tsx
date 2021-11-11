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

import { FormContext, FormTheme } from '../../components/Form/Form';
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

const DateTimePickerComponent: React.FC<InputComponentProps> = ({
  fieldShape,
  id,
  inputValue,
  onBlur,
  onChange,
  onFocus,
}) => {
  const intl = useIntl();
  const classes = useStyles();

  const theme = useTheme<LibroTheme>();
  const mdUp = useMediaQuery(theme.breakpoints.up('md'));
  const { theme: formTheme } = React.useContext(FormContext);
  const showStatic = formTheme === FormTheme.Flow && mdUp;
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
          name={id}
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
          id={id}
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
