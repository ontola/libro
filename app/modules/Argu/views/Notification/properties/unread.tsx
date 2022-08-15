import {
  FC,
  Property,
  PropertyProps,
  register,
} from 'link-redux';
import React from 'react';

import {
  cardFixedTopology,
  cardMainTopology,
  cardTopology,
  containerTopology,
  fullResourceTopology,
} from '../../../../Common/topologies';
import ontola from '../../../../Kernel/ontology/ontola';
import { navbarTopology } from '../../../../NavBar/topologies';
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
