import * as schema from '@ontologies/schema';
import { Property, register } from 'link-redux';
import React from 'react';

import ActionsBar from '../../../Action/topologies/ActionsBar';
import CardContent from '../../../Common/components/Card/CardContent';
import HeaderWithMenu from '../../../Common/components/HeaderWithMenu';
import Card from '../../../Common/topologies/Card';
import { containerTopology } from '../../../Common/topologies/Container';
import ContentDetails from '../../../Common/topologies/ContentDetails';
import ontola from '../../../Kernel/ontology/ontola';
import teamGL from '../../ontology/teamGL';

import { useContactOptionStyles } from './useContactOptionStyles';

const NewVolunteerContainer = () => {
  const classes = useContactOptionStyles();

  return (
    <Card>
      <CardContent noSpacing>
        <HeaderWithMenu
          menu={<Property label={ontola.actionsMenu} />}
        >
          <Property label={schema.name} />
        </HeaderWithMenu>
        <ContentDetails>
          <Property label={teamGL.department} />
          <Property label={schema.dateCreated} />
          <Property label={teamGL.source} />
        </ContentDetails>
        <div className={classes.volunteerContactOptions}>
          <Property label={teamGL.telephone} />
          <Property label={schema.email} />
        </div>
      </CardContent>
      <ActionsBar>
        <Property label={ontola.favoriteAction} />
      </ActionsBar>
    </Card>
  );
};

NewVolunteerContainer.type = [teamGL.NewVolunteer];

NewVolunteerContainer.topology = [
  containerTopology,
];

export default register(NewVolunteerContainer);
