import React from 'react';

import { Input } from '../components/Input';

const DatePicker = React.lazy(
  // eslint-disable-next-line no-inline-comments
  () => import(/* webpackChunkName: "Forms" */ '../async/DatePicker/index')
);

const DatePickerLoader = (props) => {
  if (!__CLIENT__) {
    return (
      <div className="Field__input Field__input--text">
        <Input element="input" />
      </div>
    );
  }

  return (
    <React.Suspense fallback={<input />}>
      <DatePicker {...props} />
    </React.Suspense>
  );
};

export default DatePickerLoader;
