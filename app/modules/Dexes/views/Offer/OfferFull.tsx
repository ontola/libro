import {
  FC,
  Property,
  register,
} from 'link-redux';
import React from 'react';

import dexes from '../../ontology/dexes';
import { fullResourceTopology } from '../../../../topologies';
import AttributeList from '../../../../topologies/AttributeList';
import CardMain from '../../../../topologies/Card/CardMain';
import Container from '../../../../topologies/Container';
import AttributeListItem from '../../../Common/components/AttributeListItem';
import CardContent from '../../../Common/components/Card/CardContent';
import { namePredicates } from '../../../Common/lib/predicates';

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
