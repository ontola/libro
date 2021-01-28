import * as schema from '@ontologies/schema';
import { linkedPropType, register } from 'link-redux';
import React from 'react';

import Heading from '../../../components/Heading';
import { gridTopology } from '../../../topologies/Grid';

const GridActionName = ({ linkedProp }) => (
  <Heading size="2">
    {linkedProp.value}
  </Heading>
);

GridActionName.type = schema.Action;

GridActionName.topology = gridTopology;

GridActionName.property = schema.name;

GridActionName.propTypes = {
  linkedProp: linkedPropType,
};

export default register(GridActionName);
