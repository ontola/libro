import schema from '@ontologies/schema';
import {
  Property,
  register,
} from 'link-redux';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';
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
            menu={<Property label={NS.ontola('actionsMenu')} />}
          >
            <Property label={schema.name} />
          </HeaderWithMenu>
          <ContentDetails>
            <Property label={NS.teamGL('department')} />
            <Property label={schema.startDate} />
          </ContentDetails>
          <Property label={NS.teamGL('desiredCount')} />
          <Property label={schema.text} />
        </CardContent>
      </CardMain>
    </Container>
    <Container>
      <Property renderWhenEmpty label={NS.teamGL('potentialParticipants')}>
        <Property renderWhenEmpty singlePage collectionDisplay={NS.ontola('collectionDisplay/card')} label={NS.ontola('pages')} />
      </Property>
      <Property renderWhenEmpty label={NS.teamGL('participants')}>
        <Property singlePage collectionDisplay={NS.ontola('collectionDisplay/card')} label={NS.ontola('pages')} />
      </Property>
    </Container>
  </PrimaryResource>
);

EventPage.type = NS.teamGL('Event');

EventPage.topology = pageTopology;

export default register(EventPage);
