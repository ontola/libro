import * as schema from '@ontologies/schema';
import { Property, register } from 'link-redux';
import React from 'react';

import ActionsBar from '../../../Action/topologies/ActionsBar';
import CardContent from '../../../Common/components/Card/CardContent';
import HeaderWithMenu from '../../../Common/components/HeaderWithMenu';
import { cardRowTopology } from '../../../Common/topologies/Card/CardRow';
import ContentDetails from '../../../Common/topologies/ContentDetails';
import ontola from '../../../Kernel/ontology/ontola';
import teamGL from '../../ontology/teamGL';
import { useContactOptionStyles } from '../Volunteer/useContactOptionStyles';

const ParticipantCardRow = () => {
  const classes = useContactOptionStyles();

  return (
    <React.Fragment>
      <CardContent>
        <HeaderWithMenu
          menu={<Property label={ontola.actionsMenu} />}
        >
          <Property label={schema.name} />
        </HeaderWithMenu>
        <ContentDetails>
          <Property label={teamGL.engagement} />
          <Property label={teamGL.signedUp} />
        </ContentDetails>
        <div className={classes.volunteerContactOptions}>
          <Property label={teamGL.telephone} />
          <Property label={schema.email} />
        </div>
      </CardContent>
      <ActionsBar>
        <Property label={ontola.favoriteAction} />
      </ActionsBar>
    </React.Fragment>
  );
};

ParticipantCardRow.type = teamGL.Participant;

ParticipantCardRow.topology = cardRowTopology;

export default register(ParticipantCardRow);
