import {
  FormControl,
  Input,
  InputAdornment,
} from '@mui/material';
import rdf from '@ontologies/core';
import * as schema from '@ontologies/schema';
import { useFields } from 'link-redux';
import React from 'react';
import { useIntl } from 'react-intl';

import { tryParseInt } from '../../../Common/lib/numbers';
import { formContext } from '../Form/FormContext';
import { formFieldContext } from '../FormField/FormFieldContext';
import { InputComponentProps } from '../FormField/FormFieldTypes';

const MoneyInput: React.FC<InputComponentProps> = ({
  inputValue,
  onChange,
}) => {
  const intl = useIntl();
  const { object } = React.useContext(formContext);
  const {
    name,
    onBlur,
    onFocus,
  } = React.useContext(formFieldContext);
  const [currency] = useFields(object, schema.currency);
  const [priceCurrency] = useFields(object, schema.priceCurrency);
  const handleChange = React.useCallback((e: any) => {
    e.preventDefault();
    onChange(rdf.literal(e.target.value * 100));
  }, [onChange]);
  const value = (tryParseInt(inputValue) || 0) / 100;
  const parts = intl.formatNumberToParts(
    value,
    {
      currency: (currency || priceCurrency)?.value,
      currencyDisplay: 'narrowSymbol',
      style: 'currency',
    },
  );
  const symbol = parts.find(({ type }) => type === 'currency')?.value;

  return (
    <FormControl fullWidth>
      <Input
        name={name}
        startAdornment={(
          <InputAdornment position="start">
            {symbol}
          </InputAdornment>
        )}
        type="number"
        value={value}
        onBlur={onBlur}
        onChange={handleChange}
        onFocus={onFocus}
      />
    </FormControl>
  );
};

export default MoneyInput;
