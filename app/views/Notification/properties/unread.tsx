import {
  FC,
  Property,
  PropertyProps,
  register,
} from 'link-redux';
import React from 'react';

import argu from '../../../ontology/argu';
import ontola from '../../../ontology/ontola';
import { cardTopology } from '../../../topologies/Card';
import { cardFixedTopology } from '../../../topologies/Card/CardFixed';
import { cardMainTopology } from '../../../topologies/Card/CardMain';
import { containerTopology } from '../../../topologies/Container';
import { navbarTopology } from '../../../topologies/Navbar';
import { fullResourceTopology } from '../../../topologies/FullResource';

const Unread: FC<PropertyProps> = ({
  linkedProp,
}) => {
  if (linkedProp.value === 'false') {
    return null;
  }

  return (
    <Property
      forceRender
      label={ontola.readAction}
    />
  );
};

Unread.type = argu.Notification;

Unread.property = argu.unread;

Unread.topology = [
  cardFixedTopology,
  cardMainTopology,
  cardTopology,
  containerTopology,
  navbarTopology,
  fullResourceTopology,
];

export default register(Unread);
