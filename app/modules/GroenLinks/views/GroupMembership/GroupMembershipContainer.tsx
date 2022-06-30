import * as schema from '@ontologies/schema';
import { Property, register } from 'link-redux';
import React from 'react';

import org from '../../../../ontology/org';
import CardContent from '../../../Common/components/Card/CardContent';
import HeaderWithMenu from '../../../Common/components/HeaderWithMenu';
import Card from '../../../Common/topologies/Card';
import { containerTopology } from '../../../Common/topologies/Container';
import ContentDetails from '../../../Common/topologies/ContentDetails';
import ontola from '../../../Core/ontology/ontola';
import teamGL from '../../ontology/teamGL';
import { useContactOptionStyles } from '../Volunteer/useContactOptionStyles';

const GroupMembershipContainer = () => {
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

GroupMembershipContainer.type = org.Membership;

GroupMembershipContainer.topology = containerTopology;

export default register(GroupMembershipContainer);
