import { SomeTerm } from '@ontologies/core';
import { FC, register } from 'link-redux';
import React from 'react';

import NavbarLinkCount from '../../../components/NavbarLink/NavbarLinkCount';
import { tryParseInt } from '../../../helpers/numbers';
import argu from '../../../ontology/argu';
import { navbarTopology } from '../../../topologies/Navbar';
import { fullResourceTopology } from '../../../topologies/FullResource';
import { CollectionTypes } from '../types';

interface UnreadCountProps {
  linkedProp: SomeTerm;
}

const UnreadCount: FC<UnreadCountProps> = ({ linkedProp }) => (
  <span>
    {` (${linkedProp.value})`}
  </span>
);

UnreadCount.type = CollectionTypes;

UnreadCount.property = argu.unreadCount;

UnreadCount.topology = fullResourceTopology;

const UnreadCountHeader: FC<UnreadCountProps> = ({ linkedProp }) => (
  <NavbarLinkCount count={tryParseInt(linkedProp) || 0} />
);

UnreadCountHeader.type = CollectionTypes;

UnreadCountHeader.property = argu.unreadCount;

UnreadCountHeader.topology = navbarTopology;

export default [
  register(UnreadCount),
  register(UnreadCountHeader),
];
