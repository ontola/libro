import { SomeTerm } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import {
  FC,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';
import { FormattedNumber } from 'react-intl';

import { tryParseInt } from '../../../helpers/numbers';
import { allTopologies } from '../../../topologies';

interface PriceProps {
  linkedProp: SomeTerm;
}

const Price: FC<PriceProps> = ({
  linkedProp,
}): JSX.Element => {
  const [currency] = useProperty(schema.priceCurrency);
  const priceInt = tryParseInt(linkedProp) || 0;

  return (
    <FormattedNumber
      currency={currency?.value}
      currencyDisplay="narrowSymbol"
      style="currency"
      value={priceInt}
    />
  );
};

Price.type = schema.Thing;

Price.topology = allTopologies;

Price.property = schema.price;

export default register(Price);
