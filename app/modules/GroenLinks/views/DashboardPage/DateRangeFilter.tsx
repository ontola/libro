import rdf from '@ontologies/core';
import React from 'react';

import FormField from '../../../../components/FormField/FormField';
import DatePicker from '../../../../containers/DatePicker';
import { InputValue } from '../../../../hooks/useFormField';

import { DATE_SIZE } from './DashboardPageFull';

type DateRange = [Date, Date];

interface DateRangeFilterProps {
  dateRange: DateRange;
  label: string;
  setDateRange: (range: DateRange) => void;
}

const emptyFunction = () => undefined;

const dateToLiteral = (date: Date) => {
  const dd = date.getDate().toString().padStart(DATE_SIZE, '0');
  const mm = (date.getMonth() + 1).toString().padStart(DATE_SIZE, '0');
  const yyyy = date.getFullYear();

  return rdf.literal([yyyy, mm, dd].join('-'));
};

const DateRangeFilter: React.FC<DateRangeFilterProps> = ({
  dateRange,
  label,
  setDateRange,
}) => {
  const values = React.useMemo(() => (
    dateRange.map(dateToLiteral)
  ), [dateRange]);
  const handleChange = React.useCallback(([start, end]: InputValue[]) => {
    setDateRange([new Date(start.value), new Date(end.value)]);
  }, [setDateRange]);

  return (
    <div>
      <FormField
        fieldShape={{
          maxCount: 2,
          minCount: 2,
        }}
        inputComponent={DatePicker}
        label={label}
        name="date-range"
        values={values}
        onBlur={emptyFunction}
        onChange={handleChange}
        onFocus={emptyFunction}
      />
    </div>
  );
};

export default DateRangeFilter;
