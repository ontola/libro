import {
  linkedPropType,
} from 'link-redux';
import React from 'react';
import FontAwesome from 'react-fontawesome';

import LinkedRenderStore, { NS } from '../../../helpers/LinkedRenderStore';

const propTypes = {
  linkedProp: linkedPropType,
};

const Unread = ({ linkedProp }) => (
  linkedProp && <FontAwesome ariaLabel="Unread" name="star-o" />
);

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
