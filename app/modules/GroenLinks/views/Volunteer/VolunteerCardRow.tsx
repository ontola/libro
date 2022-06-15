import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import { Property, register } from 'link-redux';
import React from 'react';

import teamGL from '../../ontology/teamGL';
import { cardRowTopology } from '../../../../topologies';
import ContentDetails from '../../../../topologies/ContentDetails';
import CardContent from '../../../Common/components/Card/CardContent';

const VolunteerCardRow = () => (
  <CardContent>
    <Property label={[schema.name, rdfs.label]} />
    <ContentDetails>
      <Property label={teamGL.department} />
      <Property label={teamGL.engagement} />
      <Property label={schema.dateCreated} />
    </ContentDetails>
    <Property label={schema.text} />
  </CardContent>
);

VolunteerCardRow.type = teamGL.Volunteer;

VolunteerCardRow.topology = cardRowTopology;

export default register(VolunteerCardRow);
