import schema from '@ontologies/schema';
import {
  Property,
  register,
} from 'link-redux';
import React from 'react';

import ontola from '../../../ontology/ontola';
import teamGL from '../../../ontology/teamGL';
import { pageTopology } from '../../../topologies/Page';
import PrimaryResource from '../../../topologies/PrimaryResource';
import Container from '../../../topologies/Container';
import CardMain from '../../../topologies/Card/CardMain';
import CardContent from '../../../components/Card/CardContent';
import ContentDetails from '../../../topologies/ContentDetails';
import HeaderWithMenu from '../../../components/HeaderWithMenu';

const GroupPage = () => (
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
          </ContentDetails>
          <Property label={schema.text} />
        </CardContent>
      </CardMain>
    </Container>
    <Container>
      <Property renderWhenEmpty label={ontola.memberships} />
    </Container>
  </PrimaryResource>
);

GroupPage.type = teamGL.Group;

GroupPage.topology = pageTopology;

export default register(GroupPage);
