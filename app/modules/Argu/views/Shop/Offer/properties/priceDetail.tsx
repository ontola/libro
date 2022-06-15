import { Literal } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import {
  FC,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';
import { FormattedNumber } from 'react-intl';

import argu from '../../../../ontology/argu';
import { detailsBarTopology } from '../../../../../../topologies';
import Detail, { DetailVariant } from '../../../../../Common/components/Detail';
import { tryParseInt } from '../../../../../Common/lib/numbers';

interface PriceProps {
  linkedProp: Literal;
}

const PriceDetail: FC<PriceProps> = ({
  linkedProp,
}) => {
  const [priceCurrency] = useProperty(schema.priceCurrency);
  const priceInt = tryParseInt(linkedProp) ?? 0;

  return (
    <Detail
      text={(
        <FormattedNumber
          currency={priceCurrency?.value}
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
