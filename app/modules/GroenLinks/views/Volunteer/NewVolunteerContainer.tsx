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
import { containerTopology } from '../../../../topologies/Container';
import Card from '../../../../topologies/Card';
import ContentDetails from '../../../../topologies/ContentDetails';
import ActionsBar from '../../../../topologies/ActionsBar';

import { useContactOptionStyles } from './index';

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
