import {
  FC,
  Property,
  register,
} from 'link-redux';
import React from 'react';

import AttributeListItem from '../../../components/AttributeListItem';
import CardContent from '../../../components/Card/CardContent';
import dexes from '../../../ontology/dexes';
import { fullResourceTopology } from '../../../topologies';
import AttributeList from '../../../topologies/AttributeList';
import CardMain from '../../../topologies/Card/CardMain';
import Container from '../../../topologies/Container';
import { namePredicates } from '../../Thing/properties/name';

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
