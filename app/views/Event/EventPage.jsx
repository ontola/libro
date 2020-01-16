import schema from '@ontologies/schema';
import {
  Property,
  register,
} from 'link-redux';
import React from 'react';

import ontola from '../../ontology/ontola';
import teamGL from '../../ontology/teamGL';
import { pageTopology } from '../../topologies/Page';
import PrimaryResource from '../../topologies/PrimaryResource';
import Container from '../../topologies/Container';
import CardMain from '../../topologies/Card/CardMain';
import CardContent from '../../components/Card/CardContent';
import ContentDetails from '../../topologies/ContentDetails';
import HeaderWithMenu from '../../components/HeaderWithMenu';

const EventPage = () => (
  <PrimaryResource>
    <Container>
      <CardMain>
        <CardContent>
          <HeaderWithMenu
            menu={<Property label={ontola.actionsMenu} />}
          >
            <Property label={schema.name} />
          </HeaderWithMenu>
          <ContentDetails>
            <Property label={teamGL.department} />
            <Property label={schema.startDate} />
          </ContentDetails>
          <Property label={teamGL.desiredCount} />
          <Property label={schema.text} />
        </CardContent>
      </CardMain>
    </Container>
    <Container>
      <Property renderWhenEmpty label={teamGL.potentialParticipants}>
        <Property renderWhenEmpty singlePage collectionDisplay={ontola.ns('collectionDisplay/card')} label={ontola.pages} />
      </Property>
      <Property renderWhenEmpty label={teamGL.participants}>
        <Property singlePage collectionDisplay={ontola.ns('collectionDisplay/card')} label={ontola.pages} />
      </Property>
    </Container>
  </PrimaryResource>
);

EventPage.type = teamGL.Event;

EventPage.topology = pageTopology;

export default register(EventPage);
