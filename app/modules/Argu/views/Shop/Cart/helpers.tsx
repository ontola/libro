import { makeStyles } from '@mui/styles';
import * as schema from '@ontologies/schema';
import { useProperty } from 'link-redux';
import React from 'react';
import { FormattedNumber } from 'react-intl';

import { LibroTheme, Margin } from '../../../../Kernel/lib/themes';
import { LabelFormatter } from '../../../../Common/components/Progress';
import { tryParseInt } from '../../../../Common/lib/numbers';
import argu from '../../../ontology/argu';

const useStyles = makeStyles((theme: LibroTheme) => ({
  totalPrice: {
    float: 'right',
    marginTop: theme.spacing(Margin.Small),
  },
  totalPriceExceeded: {
    color: theme.palette.error.dark,
    float: 'right',
    fontWeight: theme.typography.fontWeightBold,
    marginTop: theme.spacing(Margin.Small),
  },
}));

export const useCartProgressFormatter = (): LabelFormatter => {
  const classes = useStyles();
  const [priceCurrency] = useProperty(schema.priceCurrency);
  const [budgetMax] = useProperty(argu.budgetMax);
  const [totalPrice] = useProperty(schema.totalPaymentDue);

  const budgetMaxInt = tryParseInt(budgetMax);
  const totalPriceInt = tryParseInt(totalPrice) ?? 0;
  const budgetExceeded = budgetMaxInt && totalPriceInt > budgetMaxInt;

  return React.useCallback((value: number, max: number) => (
    <div className={budgetExceeded ? classes.totalPriceExceeded : classes.totalPrice}>
      <FormattedNumber
        currency={priceCurrency.value}
        currencyDisplay="narrowSymbol"
        style="currency"
        value={value / 100}
      />
      /
      <FormattedNumber
        currency={priceCurrency.value}
        currencyDisplay="narrowSymbol"
        style="currency"
        value={max / 100}
      />
    </div>
  ), [budgetExceeded, priceCurrency]);
};

