import rdf from '@ontologies/core';
import React from 'react';
import FormField from '../../components/FormField/FormField';
import DatePicker from '../../containers/DatePicker';
import { InputValue } from '../../hooks/useFormField';
import { DATE_SIZE } from './DashboardFull';

interface DateRangeFilterProps {
  dateRange: [Date, Date];
  label: string;
  setDateRange: (range: [Date, Date]) => void;
}

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
  const handleChange = React.useCallback((newValues: InputValue[]) => {
    setDateRange([new Date(newValues[0].value), new Date(newValues[1].value)]);
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
        onChange={handleChange}
      />
    </div>
  );
};

export default DateRangeFilter;
