import {
  FC,
  Property,
  PropertyProps,
  register,
} from 'link-redux';
import React from 'react';

import { cardTopology } from '../../../../Common/topologies/Card';
import { cardFixedTopology } from '../../../../Common/topologies/Card/CardFixed';
import { cardMainTopology } from '../../../../Common/topologies/Card/CardMain';
import { containerTopology } from '../../../../Common/topologies/Container';
import { fullResourceTopology } from '../../../../Common/topologies/FullResource';
import ontola from '../../../../Kernel/ontology/ontola';
import { navbarTopology } from '../../../../NavBar/topologies/Navbar';
import argu from '../../../ontology/argu';

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
