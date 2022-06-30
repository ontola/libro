import * as schema from '@ontologies/schema';
import { Property, register } from 'link-redux';
import React from 'react';

import ActionsBar from '../../../Action/topologies/ActionsBar';
import CardContent from '../../../Common/components/Card/CardContent';
import HeaderWithMenu from '../../../Common/components/HeaderWithMenu';
import CardMain from '../../../Common/topologies/Card/CardMain';
import Container from '../../../Common/topologies/Container';
import ContentDetails from '../../../Common/topologies/ContentDetails';
import { fullResourceTopology } from '../../../Common/topologies/FullResource';
import ontola from '../../../Core/ontology/ontola';
import teamGL from '../../ontology/teamGL';

const EventFull = () => (
  <React.Fragment>
    <Container>
      <CardMain>
        <CardContent>
          <HeaderWithMenu
            menu={<Property label={ontola.actionsMenu} />}
          >
            <Property label={schema.name} />
          </HeaderWithMenu>
          <ContentDetails>
            <Property label={teamGL.eventType} />
            <Property label={teamGL.participantsCount} />
            <Property label={teamGL.department} />
            <Property label={schema.startDate} />
            <Property label={schema.location} />
          </ContentDetails>
          <Property label={schema.text} />
        </CardContent>
        <ActionsBar>
          <Property label={ontola.signUpAction} />
        </ActionsBar>
      </CardMain>
    </Container>
    <Container>
      <Property
        renderWhenEmpty
        label={teamGL.potentialParticipants}
      >
        <Property
          renderWhenEmpty
          singlePage
          collectionDisplay={ontola.ns('collectionDisplay/card')}
          label={ontola.pages}
        />
      </Property>
      <Property
        renderWhenEmpty
        label={teamGL.participants}
      >
        <Property
          singlePage
          collectionDisplay={ontola.ns('collectionDisplay/card')}
          label={ontola.pages}
        />
      </Property>
    </Container>
  </React.Fragment>
);

EventFull.type = teamGL.Event;

EventFull.topology = fullResourceTopology;

export default register(EventFull);
