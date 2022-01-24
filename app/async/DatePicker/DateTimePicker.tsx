import DayJSUtils from '@date-io/dayjs';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import * as xsd from '@ontologies/xsd';
import React from 'react';
import { useIntl } from 'react-intl';

import { InputComponentProps } from '../../components/FormField/InputComponentProps';
import HiddenRequiredInput from '../../components/Input/HiddenRequiredInput';
import { formMessages } from '../../translations/messages';

import { useDateInput } from './hooks/useDateInput';

const DateTimePickerComponent: React.FC<InputComponentProps> = ({
  inputValue,
  onChange,
}) => {
  const intl = useIntl();

  const {
    required,
    ownOnChange,
    onAccept,
    name,
    value,
    variant,
    className,
  } = useDateInput(inputValue, xsd.dateTime, onChange);

  return (
    <MuiPickersUtilsProvider
      utils={DayJSUtils}
    >
      {required && (
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
          variant={variant}
          onAccept={onAccept}
          onChange={ownOnChange}
        />
      </div>
    </MuiPickersUtilsProvider>
  );
};

export default DateTimePickerComponent;
