import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
} from 'link-redux';
import React from 'react';

import AttributeListItem from '../../../components/AttributeListItem';
import CardContent from '../../../components/Card/CardContent';
import dexes from '../../../ontology/dexes';
import AttributeList from '../../../topologies/AttributeList';
import CardMain from '../../../topologies/Card/CardMain';
import Container from '../../../topologies/Container';
import { fullResourceTopology } from '../../../topologies/FullResource';
import { namePredicates } from '../../Thing/properties/name';

interface AgreementFull {
  renderPartOf: boolean;
}

const AgreementFull: FC<AgreementFull> = ({
  renderPartOf,
}) => (
  <Container>
    {renderPartOf && <Property label={schema.isPartOf} />}
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
