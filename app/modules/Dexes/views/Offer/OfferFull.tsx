import {
  FC,
  Property,
  register,
} from 'link-redux';
import React from 'react';

import AttributeListItem from '../../../Common/components/AttributeListItem';
import CardContent from '../../../Common/components/Card/CardContent';
import { namePredicates } from '../../../Common/lib/predicates';
import { fullResourceTopology } from '../../../Common/topologies';
import AttributeList from '../../../Common/topologies/AttributeList';
import CardMain from '../../../Common/topologies/Card/CardMain';
import Container from '../../../Common/topologies/Container';
import dexes from '../../ontology/dexes';

const DexesOfferFull: FC = () => (
  <Container>
    <CardMain>
      <CardContent endSpacing>
        <Property label={namePredicates} />
        <AttributeList>
          <AttributeListItem label={dexes.file} />
          <AttributeListItem label={dexes.dataOwner} />
          <AttributeListItem label={dexes.recipients} />
        </AttributeList>
        <Property label={dexes.brokerUrl} />
      </CardContent>
    </CardMain>
  </Container>
);

DexesOfferFull.type = dexes.Offer;

DexesOfferFull.topology = fullResourceTopology;

export default register(DexesOfferFull);
