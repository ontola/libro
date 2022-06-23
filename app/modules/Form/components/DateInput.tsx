import clsx from 'clsx';
import React from 'react';

import Suspense from '../../Core/components/Suspense';

import { InputComponentProps } from './FormField/FormFieldTypes';
import { fieldInputCID, useFormStyles } from './FormField/UseFormStyles';
import { Input } from './Input';

export enum DateInputType {
  Date = 'date',
  DateTime = 'dateTime',
}

export interface DateInputProps extends InputComponentProps {
  type: DateInputType;
}

const DateInput = React.lazy(
  // eslint-disable-next-line no-inline-comments
  () => import(/* webpackChunkName: "Forms" */ '../async/DateInput'),
);

const DateInputLoader = (props: DateInputProps): JSX.Element => {
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
      <DateInput {...props} />
    </Suspense>
  );
};

export default DateInputLoader;
