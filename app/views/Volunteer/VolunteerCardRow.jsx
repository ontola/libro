import rdfs from '@ontologies/rdfs';
import schema from '@ontologies/schema';
import {
  Property,
  register,
} from 'link-redux';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';
import { CardContent } from '../../components';
import { cardRowTopology } from '../../topologies/Card/CardRow';
import ContentDetails from '../../topologies/ContentDetails';

const VolunteerCardRow = () => (
  <CardContent>
    <Property label={[schema.name, rdfs.label]} />
    <ContentDetails>
      <Property label={NS.teamGL('department')} />
      <Property label={NS.teamGL('engagement')} />
      <Property label={schema.dateCreated} />
    </ContentDetails>
    <Property label={schema.text} />
  </CardContent>
);

VolunteerCardRow.type = NS.teamGL('Volunteer');

VolunteerCardRow.topology = cardRowTopology;

export default register(VolunteerCardRow);
