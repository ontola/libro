import * as dcterms from '@ontologies/dcterms';
import {
  Property,
  register,
} from 'link-redux';
import React from 'react';

import CardContent from '../../../components/Card/CardContent';
import CardDivider from '../../../components/Card/CardDivider';
import Heading, { HeadingSize } from '../../../components/Heading';
import dcat from '../../../ontology/dcat';
import dexes from '../../../ontology/dexes';
import { cardTopology } from '../../../topologies/Card';
import { cardFixedTopology } from '../../../topologies/Card/CardFixed';
import { cardMainTopology } from '../../../topologies/Card/CardMain';
import { inlineTopology } from '../../../topologies/Inline';

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
