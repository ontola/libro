import * as as from '@ontologies/as';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
} from 'link-redux';
import React from 'react';

import { tableRowTopology } from '../../../../topologies';

const ThingTableRow: FC = () => (
  <Property label={[schema.name, as.name]} />
);

ThingTableRow.type = schema.Thing;

ThingTableRow.topology = tableRowTopology;

export default register(ThingTableRow);
