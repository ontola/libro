import { SomeTerm } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import { FC, register } from 'link-redux';
import React from 'react';
import { useIntl } from 'react-intl';

import { notificationMessages } from '../../../../../translations/messages';
import { tryParseInt } from '../../../../Common/lib/numbers';
import NavbarLinkCount from '../../../../NavBar/components/NavbarLink/NavbarLinkCount';
import { navbarTopology } from '../../../../NavBar/topologies/Navbar';
import argu from '../../../lib/argu';

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
