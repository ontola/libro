import {
  linkedPropType,
} from 'link-redux';
import React from 'react';

import LinkedRenderStore, { NS } from '../../../helpers/LinkedRenderStore';

const UnreadCount = ({ linkedProp }) => (
  <span> ({linkedProp})</span>
);

UnreadCount.propTypes = {
  linkedProp: linkedPropType,
};

[undefined, NS.argu('sidebar')].forEach((top) => {
  LinkedRenderStore.registerRenderer(
    UnreadCount,
    NS.argu('InfiniteCollection'),
    NS.argu('unreadCount'),
    top
  );
});

export default UnreadCount;
