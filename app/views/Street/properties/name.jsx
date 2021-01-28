import * as schema from '@ontologies/schema';
import { linkedPropType, register } from 'link-redux';
import React from 'react';

import Heading from '../../../components/Heading';
import teamGL from '../../../ontology/teamGL';
import { allTopologies } from '../../../topologies';

const StreetName = ({ linkedProp }) => (
  <Heading size="4">
    {linkedProp.value}
  </Heading>
);

StreetName.type = teamGL.Street;

StreetName.topology = allTopologies;

StreetName.property = schema.name;

StreetName.propTypes = {
  linkedProp: linkedPropType,
};

export default register(StreetName);
