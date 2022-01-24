import clsx from 'clsx';
import React from 'react';

import { fieldInputCID, useFormStyles } from '../components/FormField/FormField';
import { InputComponentProps } from '../components/FormField/InputComponentProps';
import { Input } from '../components/Input';
import Suspense from '../components/Suspense';

const DatePicker = React.lazy(
  // eslint-disable-next-line no-inline-comments
  () => import(/* webpackChunkName: "Forms" */ '../async/DatePicker/DatePicker'),
);

const DatePickerLoader = (props: InputComponentProps): JSX.Element => {
  const classes = useFormStyles();

  if (!__CLIENT__) {
    return (
      <div className={clsx(fieldInputCID, classes.fieldInput, 'Field__input--text')}>
        <Input
          element="input"
          name="loading-date-picker"
        />
      </div>
    );
  }

  return (
    <Suspense fallback={<input />}>
      <DatePicker {...props} />
    </Suspense>
  );
};

export default DatePickerLoader;
