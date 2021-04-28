import * as schema from '@ontologies/schema';
import {
  FC,
  PropertyProps,
  register,
} from 'link-redux';
import React from 'react';

import Heading, { HeadingSize } from '../../../components/Heading';
import { gridTopology } from '../../../topologies/Grid';

const GridActionName: FC<PropertyProps> = ({ linkedProp }) => (
  <Heading size={HeadingSize.LG}>
    {linkedProp.value}
  </Heading>
);

GridActionName.type = schema.Action;

GridActionName.topology = gridTopology;

GridActionName.property = schema.name;

export default register(GridActionName);
