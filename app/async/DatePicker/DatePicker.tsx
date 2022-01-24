import DayJSUtils from '@date-io/dayjs';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import * as xsd from '@ontologies/xsd';
import React from 'react';
import { useIntl } from 'react-intl';

import { InputComponentProps } from '../../components/FormField/InputComponentProps';
import HiddenRequiredInput from '../../components/Input/HiddenRequiredInput';
import { formMessages } from '../../translations/messages';

import { useDateInput } from './hooks/useDateInput';

const DatePickerComponent: React.FC<InputComponentProps> = ({
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
    orientation,
    className,
  } = useDateInput(inputValue, xsd.date, onChange);

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
          orientation={orientation}
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

export default DatePickerComponent;
