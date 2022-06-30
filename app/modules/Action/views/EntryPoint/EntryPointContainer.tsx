import * as schema from '@ontologies/schema';
import {
  FC,
  Resource,
  register,
} from 'link-redux';
import React from 'react';

import Card from '../../../Common/topologies/Card';
import { containerTopology } from '../../../Common/topologies/Container';
import { mainBodyTopology } from '../../../Common/topologies/MainBody';

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
