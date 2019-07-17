import React from 'react';

import { Input } from '../components/Input';

const DateTimePicker = React.lazy(
  // eslint-disable-next-line no-inline-comments
  () => import(/* webpackChunkName: "DateTimePicker" */ '../async/DateTimePicker/index')
);

const DateTimePickerLoader = (props) => {
  if (!__CLIENT__) {
    return (
      <div className="Field__input Field__input--text">
        <Input element="input" />
      </div>
    );
  }

  return (
    <React.Suspense fallback={<input />}>
      <DateTimePicker {...props} />
    </React.Suspense>
  );
};

export default DateTimePickerLoader;
