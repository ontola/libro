import LinkedRenderStore from 'link-lib';
import { linkedPropType } from 'link-redux';
import React from 'react';

import CountBubble from '../../../components/CountBubble';
import { NS } from '../../../helpers/LinkedRenderStore';
import { tryParseInt } from '../../../helpers/numbers';
import { primaryResourceTopology } from '../../../topologies/PrimaryResource';
import { sidebarTopology } from '../../../topologies/Sidebar';
import { CollectionTypes } from '../types';

const UnreadCount = ({ linkedProp }) => (
  <span> ({linkedProp.value})</span>
);

UnreadCount.propTypes = {
  linkedProp: linkedPropType,
};

export default [
  LinkedRenderStore.registerRenderer(
    UnreadCount,
    CollectionTypes,
    NS.argu('unreadCount'),
    primaryResourceTopology
  ),
  LinkedRenderStore.registerRenderer(
    ({ linkedProp }) => (
      <span
        style={{
          display: 'inline-flex',
          position: 'absolute',
          right: '.5em',
        }}
      >
        <CountBubble count={tryParseInt(linkedProp)} />
      </span>
    ),
    CollectionTypes,
    NS.argu('unreadCount'),
    sidebarTopology
  ),
];
