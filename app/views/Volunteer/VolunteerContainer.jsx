import rdfs from '@ontologies/rdfs';
import schema from '@ontologies/schema';
import {
  Property,
  register,
} from 'link-redux';
import React from 'react';

import CardContent from '../../components/Card/CardContent';
import teamGL from '../../ontology/teamGL';
import { containerTopology } from '../../topologies/Container';
import Card from '../../topologies/Card';
import ContentDetails from '../../topologies/ContentDetails';

const VolunteerContainer = () => (
  <Card>
    <CardContent noSpacing>
      <Property label={[schema.name, rdfs.label]} />
      <ContentDetails>
        <Property label={teamGL.department} />
        <Property label={teamGL.engagement} />
      </ContentDetails>
      <div className="Volunteer--contact-options">
        <Property label={teamGL.telephone} />
        <Property label={teamGL.email} />
      </div>
      <Property label={schema.text} />
    </CardContent>
  </Card>
);

VolunteerContainer.type = teamGL.Volunteer;

VolunteerContainer.topology = containerTopology;

export default register(VolunteerContainer);
