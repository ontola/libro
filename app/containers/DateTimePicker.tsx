import clsx from 'clsx';
import React from 'react';

import { InputComponentProps } from '../components/FormField/InputComponentProps';
import { fieldInputCID, useFormStyles } from '../components/FormField/UseFormStyles';
import { Input } from '../components/Input';
import Suspense from '../components/Suspense';

const DateTimePicker = React.lazy(
  // eslint-disable-next-line no-inline-comments
  () => import(/* webpackChunkName: "Forms" */ '../async/DateTimePicker'),
);

const DateTimePickerLoader = (props: InputComponentProps): JSX.Element => {
  const classes = useFormStyles();

  if (!__CLIENT__) {
    return (
      <div className={clsx(fieldInputCID, classes.fieldInput, 'Field__input--text')}>
        <Input
          element="input"
          name="loading-date-time-picker"
        />
      </div>
    );
  }

  return (
    <Suspense fallback={<input />}>
      <DateTimePicker {...props} />
    </Suspense>
  );
};

export default DateTimePickerLoader;
