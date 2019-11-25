import schema from '@ontologies/schema';
import {
  Property,
  register,
} from 'link-redux';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';
import { containerTopology } from '../../topologies/Container';
import { CardContent } from '../../components';
import Card from '../../topologies/Card';
import HeaderWithMenu from '../../components/HeaderWithMenu';
import ActionsBar from '../../topologies/ActionsBar';
import ContentDetails from '../../topologies/ContentDetails';

const ParticipantContainer = () => (
  <Card>
    <CardContent noSpacing>
      <HeaderWithMenu
        menu={<Property label={NS.ontola('actionsMenu')} />}
      >
        <Property label={NS.teamGL('volunteer')}>
          <Property label={schema.name} />
        </Property>
      </HeaderWithMenu>
      <ContentDetails>
        <Property label={NS.teamGL('engagement')} />
      </ContentDetails>
      <Property label={NS.teamGL('volunteer')}>
        <div className="Volunteer--contact-options">
          <Property label={NS.teamGL('telephone')} />
          <Property label={NS.teamGL('email')} />
        </div>
        <Property label={schema.text} />
      </Property>
    </CardContent>
    <ActionsBar>
      <Property label={NS.ontola('favoriteAction')} />
    </ActionsBar>
  </Card>
);

ParticipantContainer.type = NS.teamGL('Participant');

ParticipantContainer.topology = containerTopology;

export default register(ParticipantContainer);
