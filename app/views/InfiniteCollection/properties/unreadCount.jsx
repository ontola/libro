import LinkedRenderStore from 'link-lib';
import { linkedPropType } from 'link-redux';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';

const UnreadCount = ({ linkedProp }) => (
  <span> ({linkedProp.value})</span>
);

UnreadCount.propTypes = {
  linkedProp: linkedPropType,
};

export default LinkedRenderStore.registerRenderer(
  UnreadCount,
  NS.argu('InfiniteCollection'),
  NS.argu('unreadCount'),
  [undefined, NS.argu('sidebar')]
);
