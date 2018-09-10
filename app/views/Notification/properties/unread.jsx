import LinkedRenderStore from 'link-lib';
import {
  Property,
  linkedPropType,
} from 'link-redux';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';
import { cardTopology } from '../../../topologies/Card';
import { cardFixedTopology } from '../../../topologies/Card/CardFixed';
import { cardMainTopology } from '../../../topologies/Card/CardMain';
import { containerTopology } from '../../../topologies/Container';
import { primaryResourceTopology } from '../../../topologies/PrimaryResource';
import { sidebarTopology } from '../../../topologies/Sidebar';

const propTypes = {
  linkedProp: linkedPropType,
};

const Unread = ({ linkedProp }) => {
  // eslint-disable-next-line eqeqeq
  if (linkedProp == undefined || linkedProp == false || linkedProp.value === 'false') {
    return null;
  }

  return (
    <Property
      forceRender
      label={NS.argu('readAction')}
    >
      <div
        data-test="Notification-Unread"
        style={{
          background: '#B63131',
          borderRadius: '999px',
          bottom: 0,
          boxShadow: '0px 1px 3px 0 rgba(0,0,0,0.2)',
          cursor: 'pointer',
          height: '1em',
          left: '-.6em',
          position: 'absolute',
          top: '-.6em',
          width: '1em',
        }}
      />
    </Property>
  );
};

Unread.propTypes = propTypes;

export default LinkedRenderStore.registerRenderer(
  Unread,
  NS.argu('Notification'),
  NS.argu('unread'),
  [
    cardFixedTopology,
    cardMainTopology,
    cardTopology,
    containerTopology,
    sidebarTopology,
    primaryResourceTopology,
  ]
);
