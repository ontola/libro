import {
  Property,
  register,
} from 'link-redux';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';
import { containerTopology } from '../../topologies/Container';
import { CardContent } from '../../components';
import Card from '../../topologies/Card';
import ContentDetails from '../../topologies/ContentDetails';

const VolunteerContainer = () => (
  <Card>
    <CardContent noSpacing>
      <Property label={[NS.schema('name'), NS.rdfs('label')]} />
      <ContentDetails>
        <Property label={NS.teamGL('department')} />
        <Property label={NS.teamGL('engagement')} />
      </ContentDetails>
      <div className="Volunteer--contact-options">
        <Property label={NS.teamGL('telephone')} />
        <Property label={NS.teamGL('email')} />
      </div>
      <Property label={NS.schema.text} />
    </CardContent>
  </Card>
);

VolunteerContainer.type = NS.teamGL('Volunteer');

VolunteerContainer.topology = containerTopology;

export default register(VolunteerContainer);
