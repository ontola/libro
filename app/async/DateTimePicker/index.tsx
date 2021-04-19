import DayJSUtils from '@date-io/dayjs';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import React from 'react';
import { useIntl } from 'react-intl';

import { InputComponentProps } from '../../components/FormField/InputComponentProps';
import HiddenRequiredInput from '../../components/Input/HiddenRequiredInput';
import { formMessages } from '../../translations/messages';

const DateTimePickerComponent: React.FC<InputComponentProps> = ({
  fieldShape,
  id,
  inputValue,
  onChange,
}) => {
  const intl = useIntl();
  const value = inputValue.value?.length > 0 ? inputValue.value : null;

  return (
    <MuiPickersUtilsProvider
      utils={DayJSUtils}
    >
      {fieldShape.required && <HiddenRequiredInput name={id} value={value} />}
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
        onChange={(e) => onChange(e === null ? null : e?.format())}
      />
    </MuiPickersUtilsProvider>
  );
};

export default DateTimePickerComponent;
