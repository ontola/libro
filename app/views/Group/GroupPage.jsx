import {
  Property,
  register,
} from 'link-redux';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';
import { pageTopology } from '../../topologies/Page';
import PrimaryResource from '../../topologies/PrimaryResource';

const GroupPage = () => (
  <PrimaryResource>
    <Property label={NS.ontola('settingsMenu')} />
  </PrimaryResource>
);

GroupPage.type = NS.argu('Group');

GroupPage.topology = pageTopology;

export default register(GroupPage);
