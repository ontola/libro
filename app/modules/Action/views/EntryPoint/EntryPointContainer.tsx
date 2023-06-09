import * as schema from '@ontologies/schema';
import {
  FC,
  Resource,
  register,
} from 'link-redux';
import React from 'react';

import { containerTopology, mainBodyTopology } from '../../../Common/topologies';
import Card from '../../../Common/topologies/Card';

const EntryPointContainer: FC = (props) => (
  <Card>
    <Resource {...props} />
  </Card>
);

EntryPointContainer.type = schema.EntryPoint;

EntryPointContainer.topology = [
  containerTopology,
  mainBodyTopology,
];

export default register(EntryPointContainer);
