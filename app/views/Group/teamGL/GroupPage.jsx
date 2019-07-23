import {
  Property,
  register,
} from 'link-redux';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';
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
            menu={<Property label={NS.ontola('actionsMenu')} />}
          >
            <Property label={NS.schema('name')} />
          </HeaderWithMenu>
          <ContentDetails>
            <Property label={NS.teamGL('department')} />
          </ContentDetails>
          <Property label={NS.schema('text')} />
        </CardContent>
      </CardMain>
    </Container>
    <Container>
      <Property renderWhenEmpty label={NS.ontola('memberships')} />
    </Container>
  </PrimaryResource>
);

GroupPage.type = NS.teamGL('Group');

GroupPage.topology = pageTopology;

export default register(GroupPage);
