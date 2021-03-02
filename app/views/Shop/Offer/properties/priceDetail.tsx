import { Literal } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import {
  FC,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';
import { FormattedNumber } from 'react-intl';

import Detail from '../../../../components/Detail';
import { tryParseInt } from '../../../../helpers/numbers';
import { detailsBarTopology } from '../../../../topologies/DetailsBar';

interface PriceProps {
  linkedProp: Literal;
}

const PriceDetail: FC<PriceProps> = ({
  linkedProp,
}) => {
  const [priceCurrency] = useProperty(schema.priceCurrency);
  const priceInt = tryParseInt(linkedProp) || 0;

  return (
    <Detail
      text={(
        <FormattedNumber
          currency={priceCurrency?.value}
          currencyDisplay="narrowSymbol"
          style="currency"
          value={priceInt}
        />
      )}
    />
  );
};

PriceDetail.type = schema.Offer;

PriceDetail.topology = detailsBarTopology;

PriceDetail.property = schema.price;

export default register(PriceDetail);
