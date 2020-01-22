import schema from '@ontologies/schema';
import {
  Property,
  register,
} from 'link-redux';
import React from 'react';

import ontola from '../../ontology/ontola';
import org from '../../ontology/org';
import teamGL from '../../ontology/teamGL';
import { containerTopology } from '../../topologies/Container';
import ContentDetails from '../../topologies/ContentDetails';
import { CardContent } from '../../components';
import Card from '../../topologies/Card';
import HeaderWithMenu from '../../components/HeaderWithMenu';

const GroupMembershipContainer = () => (
  <Card>
    <CardContent noSpacing>
      <HeaderWithMenu
        menu={<Property label={ontola.actionsMenu} />}
      >
        <Property label={org.member}>
          <Property label={schema.name} />
        </Property>
      </HeaderWithMenu>
      <Property label={org.member}>
        <ContentDetails>
          <Property label={teamGL.department} />
          <Property label={teamGL.engagement} />
        </ContentDetails>
        <div className="Volunteer--contact-options">
          <Property label={teamGL.telephone} />
          <Property label={teamGL.email} />
        </div>
        <Property label={schema.text} />
      </Property>
    </CardContent>
  </Card>
);

GroupMembershipContainer.type = org.Membership;

GroupMembershipContainer.topology = containerTopology;

export default register(GroupMembershipContainer);
