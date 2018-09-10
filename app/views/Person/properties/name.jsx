import LinkedRenderStore from 'link-lib';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';
import { sidebarTopology } from '../../../topologies/Sidebar';

export default LinkedRenderStore.registerRenderer(
  ({ linkedProp }) => <p>{linkedProp.value}</p>,
  NS.schema('Person'),
  NS.schema('name'),
  sidebarTopology
);
