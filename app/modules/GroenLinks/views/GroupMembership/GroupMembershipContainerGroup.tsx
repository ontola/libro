import * as schema from '@ontologies/schema';
import {
  Property,
  register,
} from 'link-redux';
import React from 'react';

import CardContent from '../../../../components/Card/CardContent';
import HeaderWithMenu from '../../../../components/HeaderWithMenu';
import ontola from '../../../../ontology/ontola';
import org from '../../../../ontology/org';
import teamGL from '../../../../ontology/teamGL';
import { containerTopology } from '../../../../topologies';
import Card from '../../../../topologies/Card';
import ContentDetails from '../../../../topologies/ContentDetails';
import { useContactOptionStyles } from '../Volunteer/useContactOptionStyles';

const GroupMembershipContainerGroup = () => {
  const classes = useContactOptionStyles();

  return (
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
          <div className={classes.volunteerContactOptions}>
            <Property label={teamGL.telephone} />
            <Property label={schema.email} />
          </div>
          <Property label={schema.text} />
        </Property>
      </CardContent>
    </Card>
  );
};

GroupMembershipContainerGroup.type = org.Membership;

GroupMembershipContainerGroup.topology = containerTopology;

export default register(GroupMembershipContainerGroup);
