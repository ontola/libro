import foaf from '@ontologies/foaf';
import rdfs from '@ontologies/rdfs';
import schema from '@ontologies/schema';
import { Property, register } from 'link-redux';
import React from 'react';

import { selectedTopology } from '../../topologies/Selected';

const ThingSelected = () => (
  <span>
    <Property label={[schema.name, rdfs.label, foaf.name]} />
  </span>
);

ThingSelected.type = schema.Thing;

ThingSelected.topology = selectedTopology;

export default register(ThingSelected);
