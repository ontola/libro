import * as schema from '@ontologies/schema';
import {
  FC,
  Resource,
  register,
} from 'link-redux';
import React from 'react';

import { fullResourceTopology, tabPaneTopology } from '../../topologies';

const ThingTapPane: FC = (props) => (
  <Resource
    {...props}
    topology={fullResourceTopology}
  />
);

ThingTapPane.type = schema.Thing;

ThingTapPane.topology = tabPaneTopology;

export default register(ThingTapPane);
