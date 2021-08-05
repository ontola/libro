import rdf from '@ontologies/core';
import * as schema from '@ontologies/schema';
import {
  FormControl,
  Input,
  InputAdornment,
} from '@material-ui/core';
import { useResourceProperty } from 'link-redux';
import React from 'react';
import { useIntl } from 'react-intl';

import { tryParseInt } from '../../helpers/numbers';
import { FormContext } from '../Form/Form';
import { InputComponentProps } from '../FormField/InputComponentProps';

const MoneyInput: React.FC<InputComponentProps> = ({
  inputValue,
  onChange,
  name,
}) => {
  const intl = useIntl();
  const { object } = React.useContext(FormContext);
  const [currency] = useResourceProperty(object, schema.currency);
  const [priceCurrency] = useResourceProperty(object, schema.priceCurrency);
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
        onChange={handleChange}
      />
    </FormControl>
  );
};

export default MoneyInput;
