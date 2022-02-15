import { SomeTerm } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import {
  FC,
  register,
} from 'link-redux';
import React from 'react';
import { FormattedNumber } from 'react-intl';

import { tryParseInt } from '../../../helpers/numbers';
import useCurrency from '../../../hooks/useCurrency';
import argu from '../../../ontology/argu';
import { allTopologies } from '../../../topologies';

interface PriceProps {
  linkedProp: SomeTerm;
}

const Price: FC<PriceProps> = ({
  linkedProp,
  subject,
}): JSX.Element => {
  const [currency] = useCurrency(subject);
  const priceInt = tryParseInt(linkedProp) ?? 0;

  return (
    <FormattedNumber
      currency={currency}
      currencyDisplay="narrowSymbol"
      style="currency"
      value={priceInt / 100}
    />
  );
};

Price.type = schema.Thing;

Price.topology = allTopologies;

Price.property = argu.price;

export default register(Price);
