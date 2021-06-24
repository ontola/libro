import { SomeTerm } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import { FC, register } from 'link-redux';
import React from 'react';

import NavbarLinkCount from '../../../components/NavbarLink/NavbarLinkCount';
import { tryParseInt } from '../../../helpers/numbers';
import argu from '../../../ontology/argu';
import { navbarTopology } from '../../../topologies/Navbar';

interface UnreadCountProps {
  linkedProp: SomeTerm;
}

const UnreadCount: FC<UnreadCountProps> = ({ linkedProp }) => (
  <NavbarLinkCount count={tryParseInt(linkedProp) || 0} />
);

UnreadCount.type = schema.Thing;

UnreadCount.property = argu.unreadCount;

UnreadCount.topology = navbarTopology;

export default register(UnreadCount);
