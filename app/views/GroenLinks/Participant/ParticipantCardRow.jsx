import * as schema from '@ontologies/schema';
import {
  Property,
  register,
} from 'link-redux';
import React from 'react';

import CardContent from '../../../components/Card/CardContent';
import HeaderWithMenu from '../../../components/HeaderWithMenu';
import ontola from '../../../ontology/ontola';
import teamGL from '../../../ontology/teamGL';
import ActionsBar from '../../../topologies/ActionsBar';
import { cardRowTopology } from '../../../topologies/Card/CardRow';
import ContentDetails from '../../../topologies/ContentDetails';

const ParticipantCardRow = () => (
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
      <div className="Volunteer--contact-options">
        <Property label={teamGL.telephone} />
        <Property label={schema.email} />
      </div>
    </CardContent>
    <ActionsBar>
      <Property label={ontola.favoriteAction} />
    </ActionsBar>
  </React.Fragment>
);

ParticipantCardRow.type = teamGL.Participant;

ParticipantCardRow.topology = cardRowTopology;

export default register(ParticipantCardRow);
