import * as schema from '@ontologies/schema';
import {
  FC,
  Resource,
  register,
} from 'link-redux';
import React from 'react';

import { fullResourceTopology } from '../../topologies/FullResource';
import { tabPaneTopology } from '../../topologies/TabPane';

const ThingTapPane: FC = (props) => (
  <Resource
    {...props}
    topology={fullResourceTopology}
  />
);

ThingTapPane.type = schema.Thing;

ThingTapPane.topology = tabPaneTopology;

export default register(ThingTapPane);
