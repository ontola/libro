import React from 'react';

import { InputComponentProps } from '../components/FormField/FormInputs';
import { Input } from '../components/Input';
import Suspense from '../components/Suspense';

const DateTimePicker = React.lazy(
  // eslint-disable-next-line no-inline-comments
  () => import(/* webpackChunkName: "Forms" */ '../async/DateTimePicker'),
);

const DateTimePickerLoader = (props: InputComponentProps) => {
  if (!__CLIENT__) {
    return (
      <div className="Field__input Field__input--text">
        <Input element="input" />
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