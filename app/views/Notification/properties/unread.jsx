import {
  Property,
  linkedPropType,
} from 'link-redux';
import React from 'react';

import LinkedRenderStore, { NS } from '../../../helpers/LinkedRenderStore';

const propTypes = {
  linkedProp: linkedPropType,
};

const Unread = ({ linkedProp }) => {
  if (typeof linkedProp === 'undefined' || linkedProp === 'false') {
    return null;
  }

  return (
    <Property
      forceRender
      label={NS.argu('readAction')}
    >
      <div
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
          width: '1em'
        }}
      />
    </Property>
  );
};

Unread.propTypes = propTypes;

[undefined, NS.argu('collection'), NS.argu('sidebar')].forEach((top) => {
  LinkedRenderStore.registerRenderer(
    Unread,
    NS.argu('Notification'),
    NS.argu('unread'),
    top
  );
});

export default URL;
