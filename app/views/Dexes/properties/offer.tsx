import { isNamedNode } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import {
  FC,
  PropertyProps,
  register,
  useDataFetching,
  useValues,
} from 'link-redux';
import React from 'react';

import Button from '../../../components/Button';
import dexes from '../../../ontology/dexes';
import { cardTopology } from '../../../topologies/Card';
import { cardFixedTopology } from '../../../topologies/Card/CardFixed';
import { cardMainTopology } from '../../../topologies/Card/CardMain';
import { namePredicates } from '../../Thing/properties/name';

const Offer: FC<PropertyProps> = ({
  linkedProp,
}) => {
  if (!isNamedNode(linkedProp)) {
    return null;
  }

  useDataFetching(linkedProp);
  const [name] = useValues(linkedProp, namePredicates);

  return (
    <div>
      <Button
        href={linkedProp.value}
        icon="share-alt"
      >
        {name}
      </Button>
    </div>
  );
};

Offer.type = schema.Thing;

Offer.property = dexes.offer;

Offer.topology = [
  cardFixedTopology,
  cardMainTopology,
  cardTopology,
];

export default register(Offer);
