import clsx from 'clsx';
import React from 'react';

import { fieldInputCID } from '../components/FormField/FormField';
import { InputComponentProps } from '../components/FormField/InputComponentProps';
import { Input } from '../components/Input';
import Suspense from '../components/Suspense';

const DateTimePicker = React.lazy(
  // eslint-disable-next-line no-inline-comments
  () => import(/* webpackChunkName: "Forms" */ '../async/DateTimePicker'),
);

const DateTimePickerLoader = (props: InputComponentProps): JSX.Element => {
  if (!__CLIENT__) {
    return (
      <div className={clsx(fieldInputCID, 'Field__input', 'Field__input--text')}>
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
