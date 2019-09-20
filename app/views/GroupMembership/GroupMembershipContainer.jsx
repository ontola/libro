import {
  Property,
  register,
} from 'link-redux';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';
import { containerTopology } from '../../topologies/Container';
import ContentDetails from '../../topologies/ContentDetails';
import { CardContent } from '../../components';
import Card from '../../topologies/Card';
import HeaderWithMenu from '../../components/HeaderWithMenu';

const GroupMembershipContainer = () => (
  <Card>
    <CardContent noSpacing>
      <HeaderWithMenu
        menu={<Property label={NS.ontola('actionsMenu')} />}
      >
        <Property label={NS.org('member')}>
          <Property label={NS.schema('name')} />
        </Property>
      </HeaderWithMenu>
      <Property label={NS.org('member')}>
        <ContentDetails>
          <Property label={NS.teamGL('department')} />
          <Property label={NS.teamGL('engagement')} />
        </ContentDetails>
        <div className="Volunteer--contact-options">
          <Property label={NS.teamGL('telephone')} />
          <Property label={NS.teamGL('email')} />
        </div>
        <Property label={NS.schema.text} />
      </Property>
    </CardContent>
  </Card>
);

GroupMembershipContainer.type = NS.org('Membership');

GroupMembershipContainer.topology = containerTopology;

export default register(GroupMembershipContainer);
