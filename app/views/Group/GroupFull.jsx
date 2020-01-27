import {
  Property,
  register,
} from 'link-redux';
import React from 'react';

import argu from '../../ontology/argu';
import ontola from '../../ontology/ontola';
import { fullResourceTopology } from '../../topologies/FullResource';

const GroupFull = () => (
  <Property label={ontola.settingsMenu} />
);

GroupFull.type = argu.Group;

GroupFull.topology = fullResourceTopology;

export default register(GroupFull);
