import rdf from '@ontologies/core';
import {
  FormControl,
  Input,
  InputAdornment,
} from '@material-ui/core';
import React from 'react';
import { useIntl } from 'react-intl';

import { tryParseInt } from '../../helpers/numbers';
import useCurrency from '../../hooks/useCurrency';
import { FormContext } from '../Form/Form';
import { FormFieldContext } from '../FormField/FormField';
import { InputComponentProps } from '../FormField/InputComponentProps';

const MoneyInput: React.FC<InputComponentProps> = ({
  inputValue,
  onChange,
}) => {
  const intl = useIntl();
  const { object } = React.useContext(FormContext);
  const {
    name,
    onBlur,
    onFocus,
  } = React.useContext(FormFieldContext);
  const currency = useCurrency(object);
  const handleChange = React.useCallback((e: any) => {
    e.preventDefault();
    onChange(rdf.literal(e.target.value * 100));
  }, [onChange]);
  const value = (tryParseInt(inputValue) || 0) / 100;
  const parts = intl.formatNumberToParts(
    value,
    {
      currency,
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
