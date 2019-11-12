import DayJSUtils from '@date-io/dayjs';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import PropTypes from 'prop-types';
import { Literal, NamedNode } from 'rdflib';
import React from 'react';
import { useIntl } from 'react-intl';

const messages = {
  cancelLabel: {
    id: 'https://app.argu.co/i18n/forms/actions/cancel',
  },
  clearLabel: {
    id: 'https://app.argu.co/i18n/forms/actions/clear',
  },
  invalidDateMessage: {
    id: 'https://app.argu.co/i18n/forms/datetimepicker/invalidDateMessage',
  },
  invalidLabel: {
    id: 'https://app.argu.co/i18n/forms/datetimepicker/invalidLabel',
  },
  maxDateMessage: {
    id: 'https://app.argu.co/i18n/forms/datetimepicker/maxDateMessage',
  },
  minDateMessage: {
    id: 'https://app.argu.co/i18n/forms/datetimepicker/minDateMessage',
  },
  okLabel: {
    id: 'https://app.argu.co/i18n/forms/actions/ok',
  },
  todayLabel: {
    id: 'https://app.argu.co/i18n/forms/actions/showToday',
  },
};

const propTypes = {
  id: PropTypes.string,
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

const DatePickerComponent = (props) => {
  const {
    id,
    value,
    onChange,
  } = props;
  const intl = useIntl();

  return (
    <MuiPickersUtilsProvider
      utils={DayJSUtils}
    >
      <DatePicker
        autoOk
        showTodayButton
        cancelLabel={intl.formatMessage(messages.cancelLabel)}
        clearLabel={intl.formatMessage(messages.clearLabel)}
        clearable={!!value}
        format="D MMMM YYYY"
        id={id}
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

DatePickerComponent.propTypes = propTypes;
DatePickerComponent.defaultProps = defaultProps;

export default DatePickerComponent;