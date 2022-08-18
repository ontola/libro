import { SomeTerm } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import { FC, register } from 'link-redux';
import React from 'react';
import { useIntl } from 'react-intl';

import { tryParseInt } from '../../../../Common/lib/numbers';
import NavbarLinkCount from '../../../../NavBar/components/NavbarLink/NavbarLinkCount';
import { navbarTopology } from '../../../../NavBar/topologies';
import { notificationMessages } from '../../../lib/messages';
import argu from '../../../ontology/argu';

interface UnreadCountProps {
  linkedProp: SomeTerm;
}

const UnreadCount: FC<UnreadCountProps> = ({ linkedProp }) => {
  const intl = useIntl();

  return (
    <NavbarLinkCount
      count={tryParseInt(linkedProp) || 0}
      tooltip={intl.formatMessage(notificationMessages.tooltip)}
    />
  );
};

UnreadCount.type = schema.Thing;

UnreadCount.property = argu.unreadCount;

UnreadCount.topology = navbarTopology;

export default register(UnreadCount);
