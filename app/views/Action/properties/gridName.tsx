import * as schema from '@ontologies/schema';
import {
  FC,
  PropertyProps,
  register,
} from 'link-redux';
import React from 'react';

import Heading, { HeadingSize } from '../../../components/Heading';
import argu from '../../../ontology/argu';
import { gridTopology } from '../../../topologies';

const GridActionName: FC<PropertyProps> = ({ linkedProp }) => (
  <Heading size={HeadingSize.MD}>
    {linkedProp.value}
  </Heading>
);

GridActionName.type = [schema.Action, argu.CustomAction];

GridActionName.topology = gridTopology;

GridActionName.property = schema.name;

export default register(GridActionName);
