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

import Button from '../../../Common/components/Button';
import { namePredicates } from '../../../Common/lib/predicates';
import {
  cardFixedTopology,
  cardMainTopology,
  cardTopology, 
} from '../../../Common/topologies';
import dexes from '../../ontology/dexes';

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
