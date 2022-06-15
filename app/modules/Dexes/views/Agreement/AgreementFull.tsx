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

const AgreementFull: FC = () => (
  <Container>
    <CardMain>
      <CardContent
        endSpacing
        noSpacing
      >
        <Property label={namePredicates} />
        <AttributeList>
          <AttributeListItem label={dexes.file} />
          <AttributeListItem label={dexes.dataOwner} />
          <AttributeListItem label={dexes.recipients} />
          <AttributeListItem label={dexes.dateSigned} />
        </AttributeList>
        <Property label={dexes.brokerUrl} />
      </CardContent>
    </CardMain>
  </Container>
);

AgreementFull.type = dexes.Agreement;

AgreementFull.topology = fullResourceTopology;

export default register(AgreementFull);
