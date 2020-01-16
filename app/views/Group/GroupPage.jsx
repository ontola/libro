import {
  Property,
  register,
} from 'link-redux';
import React from 'react';

import argu from '../../ontology/argu';
import ontola from '../../ontology/ontola';
import { pageTopology } from '../../topologies/Page';
import PrimaryResource from '../../topologies/PrimaryResource';

const GroupPage = () => (
  <PrimaryResource>
    <Property label={ontola.settingsMenu} />
  </PrimaryResource>
);

GroupPage.type = argu.Group;

GroupPage.topology = pageTopology;

export default register(GroupPage);
