import foaf from '@ontologies/foaf';
import schema from '@ontologies/schema';
import { Property, register } from 'link-redux';
import React from 'react';

import CardContent from '../../components/Card/CardContent';
import dexes from '../../ontology/dexes';
import CardMain from '../../topologies/Card/CardMain';
import Container from '../../topologies/Container';
import { fullResourceTopology } from '../../topologies/FullResource';
import AttributeList from '../../topologies/AttributeList';
import AttributeListItem from '../../components/AttributeListItem';
import Heading from '../../components/Heading';
import { CardDivider } from '../../topologies/Card';

const DexesAgreeMentFull = () => (
  <React.Fragment>
    <Container>
      <CardMain>
        <CardContent noSpacing>
          <Heading>DataDeal</Heading>
          <AttributeList>
            <Property label={dexes.assigner}>
              <AttributeListItem label={foaf.name} propertyLabel="Deler" />
            </Property>
            <Property label={dexes.assignee}>
              <AttributeListItem label={foaf.name} propertyLabel="Ontvanger" />
            </Property>
            <AttributeListItem label={dexes.dateSigned} propertyLabel="Deal gesloten op" />
            <AttributeListItem label={dexes.file} propertyLabel="Bestand" />
            <Property label={dexes.file}>
              <AttributeListItem label={schema.encodingFormat} propertyLabel="Formaat" />
            </Property>
          </AttributeList>
        </CardContent>
        <CardDivider />
        <CardContent>
          <Heading>Condities</Heading>
          <Property label={dexes.offer}>
            {/* <AttributeListItem label={dexes.prohibitions} propertyLabel="Condities" /> */}
            <Property label={dexes.prohibitions} renderWhenEmpty={false} />
            <Property label={dexes.permissions} renderWhenEmpty={false} />
            <Property label={dexes.obligations} renderWhenEmpty={false} />
          </Property>
        </CardContent>
      </CardMain>
    </Container>
  </React.Fragment>
);

DexesAgreeMentFull.type = dexes.Agreement;

DexesAgreeMentFull.topology = fullResourceTopology;

export default register(DexesAgreeMentFull);
