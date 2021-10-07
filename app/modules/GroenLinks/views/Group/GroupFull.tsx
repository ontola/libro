import * as schema from '@ontologies/schema';
import {
  Property,
  register,
} from 'link-redux';
import React from 'react';

import CardContent from '../../../../components/Card/CardContent';
import HeaderWithMenu from '../../../../components/HeaderWithMenu';
import ontola from '../../../../ontology/ontola';
import teamGL from '../../../../ontology/teamGL';
import Container from '../../../../topologies/Container';
import CardMain from '../../../../topologies/Card/CardMain';
import ContentDetails from '../../../../topologies/ContentDetails';
import { fullResourceTopology } from '../../../../topologies/FullResource';

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
