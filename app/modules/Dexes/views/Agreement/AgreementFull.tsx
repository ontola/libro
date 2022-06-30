import {
  FC,
  Property,
  register,
} from 'link-redux';
import React from 'react';

import AttributeListItem from '../../../Common/components/AttributeListItem';
import CardContent from '../../../Common/components/Card/CardContent';
import { namePredicates } from '../../../Common/lib/predicates';
import AttributeList from '../../../Common/topologies/AttributeList';
import CardMain from '../../../Common/topologies/Card/CardMain';
import Container from '../../../Common/topologies/Container';
import { fullResourceTopology } from '../../../Common/topologies/FullResource';
import dexes from '../../ontology/dexes';

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
