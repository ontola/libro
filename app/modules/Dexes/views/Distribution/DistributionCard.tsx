import * as dcterms from '@ontologies/dcterms';
import { Property, register } from 'link-redux';
import React from 'react';

import CardContent from '../../../Common/components/Card/CardContent';
import CardDivider from '../../../Common/components/Card/CardDivider';
import Heading, { HeadingSize } from '../../../Common/components/Heading';
import {
  cardFixedTopology,
  cardMainTopology,
  cardTopology,
  inlineTopology,
} from '../../../Common/topologies';
import dcat from '../../ontology/dcat';
import dexes from '../../ontology/dexes';

const DistributionCard = () => (
  <CardContent endSpacing>
    <CardDivider margin />
    <Heading size={HeadingSize.SM}>
      <Property
        label={dcterms.format}
        topology={inlineTopology}
      />
    </Heading>
    <Property
      label={dcat.accessURL}
      topology={inlineTopology}
    />
    <Property label={dexes.offer} />
  </CardContent>
);

DistributionCard.type = dexes.Distribution;

DistributionCard.topology = [
  cardFixedTopology,
  cardMainTopology,
  cardTopology,
];

export default register(DistributionCard);
