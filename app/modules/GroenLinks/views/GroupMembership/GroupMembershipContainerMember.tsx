import * as schema from '@ontologies/schema';
import { Property, register } from 'link-redux';
import React from 'react';

import ontola from '../../../../ontology/ontola';
import org from '../../../../ontology/org';
import teamGL from '../../ontology/teamGL';
import { containerTopology } from '../../../../topologies';
import Card from '../../../../topologies/Card';
import ContentDetails from '../../../../topologies/ContentDetails';
import CardContent from '../../../Common/components/Card/CardContent';
import HeaderWithMenu from '../../../Common/components/HeaderWithMenu';

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
