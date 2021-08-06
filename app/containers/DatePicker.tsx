import React from 'react';

import { InputComponentProps } from '../components/FormField/InputComponentProps';
import { Input } from '../components/Input';
import Suspense from '../components/Suspense';

const DatePicker = React.lazy(
  // eslint-disable-next-line no-inline-comments
  () => import(/* webpackChunkName: "Forms" */ '../async/DatePicker'),
);

const DatePickerLoader = (props: InputComponentProps): JSX.Element => {
  if (!__CLIENT__) {
    return (
      <div className="Field__input Field__input--text">
        <Input
          element="input"
          name={props.name}
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
