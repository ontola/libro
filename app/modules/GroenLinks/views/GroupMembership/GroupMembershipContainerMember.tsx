import * as schema from '@ontologies/schema';
import { Property, register } from 'link-redux';
import React from 'react';

import org from '../../../../ontology/org';
import CardContent from '../../../Common/components/Card/CardContent';
import HeaderWithMenu from '../../../Common/components/HeaderWithMenu';
import Card from '../../../Common/topologies/Card';
import { containerTopology } from '../../../Common/topologies/Container';
import ContentDetails from '../../../Common/topologies/ContentDetails';
import ontola from '../../../Kernel/ontology/ontola';
import teamGL from '../../ontology/teamGL';

const GroupMembershipContainerMember = () => (
  <Card>
    <CardContent noSpacing>
      <HeaderWithMenu
        menu={<Property label={ontola.actionsMenu} />}
      >
        <Property label={org.organization}>
          <Property label={schema.name} />
        </Property>
      </HeaderWithMenu>
      <Property label={org.organization}>
        <ContentDetails>
          <Property label={[teamGL.department, schema.isPartOf]} />
          <Property label={teamGL.volunteersCount} />
        </ContentDetails>
        <Property label={schema.text} />
      </Property>
    </CardContent>
  </Card>
);

GroupMembershipContainerMember.type = org.Membership;

GroupMembershipContainerMember.topology = containerTopology;

export default register(GroupMembershipContainerMember);
