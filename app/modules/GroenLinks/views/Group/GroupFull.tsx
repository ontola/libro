import * as schema from '@ontologies/schema';
import { Property, register } from 'link-redux';
import React from 'react';

import ontola from '../../../../ontology/ontola';
import teamGL from '../../ontology/teamGL';
import { fullResourceTopology } from '../../../../topologies';
import CardMain from '../../../../topologies/Card/CardMain';
import Container from '../../../../topologies/Container';
import ContentDetails from '../../../../topologies/ContentDetails';
import CardContent from '../../../Common/components/Card/CardContent';
import HeaderWithMenu from '../../../Common/components/HeaderWithMenu';

const GroupFull = () => (
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
            <Property label={teamGL.department} />
          </ContentDetails>
          <Property label={schema.text} />
        </CardContent>
      </CardMain>
    </Container>
    <Container>
      <Property
        renderWhenEmpty
        label={ontola.memberships}
      />
    </Container>
  </React.Fragment>
);

GroupFull.type = teamGL.Group;

GroupFull.topology = fullResourceTopology;

export default register(GroupFull);
