import { Literal } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import {
  FC,
  register,
} from 'link-redux';
import React from 'react';
import { FormattedNumber } from 'react-intl';

import Detail, { DetailVariant } from '../../../../components/Detail';
import { tryParseInt } from '../../../../helpers/numbers';
import useCurrency from '../../../../hooks/useCurrency';
import argu from '../../../../ontology/argu';
import { detailsBarTopology } from '../../../../topologies/DetailsBar';

interface PriceProps {
  linkedProp: Literal;
}

const PriceDetail: FC<PriceProps> = ({
  linkedProp,
  subject,
}) => {
  const [priceCurrency] = useCurrency(subject);
  const priceInt = tryParseInt(linkedProp) ?? 0;

  return (
    <Detail
      text={(
        <FormattedNumber
          currency={priceCurrency}
          currencyDisplay="narrowSymbol"
          style="currency"
          value={priceInt / 100}
        />
      )}
      variant={DetailVariant.Bold}
    />
  );
};

PriceDetail.type = schema.Offer;

PriceDetail.topology = detailsBarTopology;

PriceDetail.property = argu.price;

export default register(PriceDetail);
