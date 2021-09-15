import {
  FC,
  PropertyProps,
  register,
} from 'link-redux';
import React from 'react';

import Button from '../../../../components/Button';
import dexes from '../../../../ontology/dexes';
import { cardTopology } from '../../../../topologies/Card';
import { cardFixedTopology } from '../../../../topologies/Card/CardFixed';
import { cardMainTopology } from '../../../../topologies/Card/CardMain';

const Offer: FC<PropertyProps> = ({
  linkedProp,
}) => (
  <div>
    <Button
      href={linkedProp.value}
      icon="external-link"
    >
      Bekijk in de Broker
    </Button>
  </div>
);

Offer.type = dexes.Distribution;

Offer.property = dexes.offer;

Offer.topology = [
  cardFixedTopology,
  cardMainTopology,
  cardTopology,
];

export default register(Offer);
