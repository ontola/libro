import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import { Property, register } from 'link-redux';
import React from 'react';

import ActionsBar from '../../../Action/topologies/ActionsBar';
import CardContent from '../../../Common/components/Card/CardContent';
import HeaderWithMenu from '../../../Common/components/HeaderWithMenu';
import { containerTopology } from '../../../Common/topologies';
import Card from '../../../Common/topologies/Card';
import ContentDetails from '../../../Common/topologies/ContentDetails';
import ontola from '../../../Kernel/ontology/ontola';
import teamGL from '../../ontology/teamGL';
import { useContactOptionStyles } from '../Volunteer/useContactOptionStyles';

const ParticipantContainer = () => {
  const classes = useContactOptionStyles();

  return (
    <Card>
      <CardContent noSpacing>
        <HeaderWithMenu
          menu={<Property label={ontola.actionsMenu} />}
        >
          <Property label={[schema.name, rdfs.label]} />
        </HeaderWithMenu>
        <ContentDetails>
          <Property label={teamGL.engagement} />
          <Property label={teamGL.signedUp} />
        </ContentDetails>
        <div className={classes.volunteerContactOptions}>
          <Property label={teamGL.telephone} />
          <Property label={schema.email} />
        </div>
        <Property label={schema.text} />
      </CardContent>
      <ActionsBar>
        <Property label={ontola.favoriteAction} />
      </ActionsBar>
    </Card>
  );
};

ParticipantContainer.type = teamGL.Participant;

ParticipantContainer.topology = containerTopology;

export default register(ParticipantContainer);
