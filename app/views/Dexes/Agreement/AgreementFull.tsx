import * as foaf from '@ontologies/foaf';
import * as schema from '@ontologies/schema';
import { Property, register } from 'link-redux';
import React from 'react';

import AttributeListItem from '../../../components/AttributeListItem';
import CardContent from '../../../components/Card/CardContent';
import CardDivider from '../../../components/Card/CardDivider';
import Heading from '../../../components/Heading';
import dexes from '../../../ontology/dexes';
import AttributeList from '../../../topologies/AttributeList';
import CardMain from '../../../topologies/Card/CardMain';
import Container from '../../../topologies/Container';
import { fullResourceTopology } from '../../../topologies/FullResource';

const AgreementFull = () => (
  <Container>
    <CardMain>
      <CardContent noSpacing>
        <Heading>
          DataDeal
        </Heading>
        <AttributeList>
          <Property label={dexes.assigner}>
            <AttributeListItem
              label={foaf.name}
              propertyLabel="Deler"
            />
          </Property>
          <Property label={dexes.assignee}>
            <AttributeListItem
              label={foaf.name}
              propertyLabel="Ontvanger"
            />
          </Property>
          <AttributeListItem
            label={dexes.dateSigned}
            propertyLabel="Deal gesloten op"
          />
          <AttributeListItem
            label={dexes.file}
            propertyLabel="Bestand"
          />
          <Property label={dexes.file}>
            <AttributeListItem
              label={schema.encodingFormat}
              propertyLabel="Formaat"
            />
          </Property>
        </AttributeList>
      </CardContent>
      <CardDivider />
      <CardContent>
        <Heading>
          Condities
        </Heading>
        <Property label={dexes.offer}>
          {/* <AttributeListItem label={dexes.prohibitions} propertyLabel="Condities" /> */}
          <Property
            label={dexes.prohibitions}
            renderWhenEmpty={false}
          />
          <Property
            label={dexes.permissions}
            renderWhenEmpty={false}
          />
          <Property
            label={dexes.obligations}
            renderWhenEmpty={false}
          />
        </Property>
      </CardContent>
    </CardMain>
  </Container>
);

AgreementFull.type = dexes.Agreement;

AgreementFull.topology = fullResourceTopology;

export default register(AgreementFull);
