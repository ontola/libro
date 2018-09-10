import LinkedRenderStore from 'link-lib';
import { linkedPropType } from 'link-redux';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';
import { primaryResourceTopology } from '../../../topologies/PrimaryResource';
import { sidebarTopology } from '../../../topologies/Sidebar';
import { CollectionTypes } from '../types';

const UnreadCount = ({ linkedProp }) => (
  <span> ({linkedProp.value})</span>
);

UnreadCount.propTypes = {
  linkedProp: linkedPropType,
};

export default LinkedRenderStore.registerRenderer(
  UnreadCount,
  CollectionTypes,
  NS.argu('unreadCount'),
  [primaryResourceTopology, sidebarTopology]
);
