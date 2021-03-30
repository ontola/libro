import DayJSUtils from '@date-io/dayjs';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import React from 'react';
import { useIntl } from 'react-intl';

import { InputComponentProps } from '../../components/FormField/InputComponentProps';
import { formMessages } from '../../translations/messages';

const DatePickerComponent: React.FC<InputComponentProps> = ({
  id,
  inputValue,
  onChange,
}) => {
  const intl = useIntl();

  return (
    <MuiPickersUtilsProvider
      utils={DayJSUtils}
    >
      <DatePicker
        autoOk
        showTodayButton
        cancelLabel={intl.formatMessage(formMessages.cancelLabel)}
        clearLabel={intl.formatMessage(formMessages.clearLabel)}
        clearable={!!inputValue.value}
        format="D MMMM YYYY"
        id={id}
        inputVariant="outlined"
        invalidDateMessage={intl.formatMessage(formMessages.invalidDateMessage)}
        invalidLabel={intl.formatMessage(formMessages.invalidLabel)}
        margin="dense"
        maxDateMessage={intl.formatMessage(formMessages.maxDateMessage)}
        minDateMessage={intl.formatMessage(formMessages.minDateMessage)}
        okLabel={intl.formatMessage(formMessages.okLabel)}
        todayLabel={intl.formatMessage(formMessages.todayLabel)}
        value={inputValue.value?.length > 0 ? inputValue.value : null}
        onChange={(e) => onChange(e === null ? null : e?.format())}
      />
    </MuiPickersUtilsProvider>
  );
};

export default DatePickerComponent;
