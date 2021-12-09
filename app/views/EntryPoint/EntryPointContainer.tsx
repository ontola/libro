import * as schema from '@ontologies/schema';
import {
  FC,
  Resource,
  register,
} from 'link-redux';
import React from 'react';

import Card from '../../topologies/Card';
import { containerTopology } from '../../topologies/Container';

const EntryPointContainer: FC = (props) => (
  <Card>
    <Resource {...props} />
  </Card>
);

EntryPointContainer.type = schema.EntryPoint;

EntryPointContainer.topology = containerTopology;

export default register(EntryPointContainer);
