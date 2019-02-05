import LinkedRenderStore from 'link-lib';
import { linkedPropType } from 'link-redux';
import React from 'react';

import NavbarLinkCount from '../../../components/NavbarLink/NavbarLinkCount';
import { NS } from '../../../helpers/LinkedRenderStore';
import { tryParseInt } from '../../../helpers/numbers';
import { navbarTopology } from '../../../topologies/Navbar';
import { primaryResourceTopology } from '../../../topologies/PrimaryResource';
import { CollectionTypes } from '../types';

const UnreadCount = ({ linkedProp }) => (
  <span> ({linkedProp.value})</span>
);

UnreadCount.propTypes = {
  linkedProp: linkedPropType,
};

const UnreadCountHeader = ({ linkedProp }) => (
  <NavbarLinkCount count={tryParseInt(linkedProp)} />
);

UnreadCountHeader.propTypes = {
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
    UnreadCountHeader,
    CollectionTypes,
    NS.argu('unreadCount'),
    navbarTopology
  ),
];
