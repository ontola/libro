import DayJSUtils from '@date-io/dayjs';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import PropTypes from 'prop-types';
import { Literal, NamedNode } from 'rdflib';
import React from 'react';
import { defineMessages, useIntl } from 'react-intl';

const messages = defineMessages({
  cancelLabel: {
    defaultMessage: 'cancel',
    id: 'https://app.argu.co/i18n/forms/actions/cancel',
  },
  clearLabel: {
    defaultMessage: 'clear',
    id: 'https://app.argu.co/i18n/forms/actions/clear',
  },
  invalidDateMessage: {
    defaultMessage: 'Invalid Date Format',
    id: 'https://app.argu.co/i18n/forms/datetimepicker/invalidDateMessage',
  },
  invalidLabel: {
    defaultMessage: 'unknown',
    id: 'https://app.argu.co/i18n/forms/datetimepicker/invalidLabel',
  },
  maxDateMessage: {
    defaultMessage: 'Date should not be after maximal date',
    id: 'https://app.argu.co/i18n/forms/datetimepicker/maxDateMessage',
  },
  minDateMessage: {
    defaultMessage: 'Date should not be before minimal date',
    id: 'https://app.argu.co/i18n/forms/datetimepicker/minDateMessage',
  },
  okLabel: {
    defaultMessage: 'ok',
    id: 'https://app.argu.co/i18n/forms/actions/ok',
  },
  todayLabel: {
    defaultMessage: 'now',
    id: 'https://app.argu.co/i18n/forms/actions/showToday',
  },
});

const propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Literal),
    PropTypes.instanceOf(NamedNode),
    PropTypes.oneOf([null]),
  ]),
};

const defaultProps = {
  value: null,
};

const DateTimePickerComponent = (props) => {
  const {
    value,
    onChange,
  } = props;
  const intl = useIntl();

  return (
    <MuiPickersUtilsProvider
      utils={DayJSUtils}
    >
      <DateTimePicker
        autoOk
        showTodayButton
        ampm={false}
        cancelLabel={intl.formatMessage(messages.cancelLabel)}
        clearLabel={intl.formatMessage(messages.clearLabel)}
        clearable={!!value}
        format="D MMMM YYYY HH:mm"
        inputVariant="outlined"
        invalidDateMessage={intl.formatMessage(messages.invalidDateMessage)}
        invalidLabel={intl.formatMessage(messages.invalidLabel)}
        margin="dense"
        maxDateMessage={intl.formatMessage(messages.maxDateMessage)}
        minDateMessage={intl.formatMessage(messages.minDateMessage)}
        okLabel={intl.formatMessage(messages.okLabel)}
        todayLabel={intl.formatMessage(messages.todayLabel)}
        value={value}
        onChange={e => onChange(e === null ? null : e?.format())}
      />
    </MuiPickersUtilsProvider>
  );
};

DateTimePickerComponent.propTypes = propTypes;
DateTimePickerComponent.defaultProps = defaultProps;

export default DateTimePickerComponent;