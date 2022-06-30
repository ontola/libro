import * as schema from '@ontologies/schema';
import {
  FC,
  PropertyProps,
  register,
} from 'link-redux';
import React from 'react';

import Heading, { HeadingSize } from '../../../../Common/components/Heading';
import { cardTopology } from '../../../../Common/topologies/Card';
import { cardFixedTopology } from '../../../../Common/topologies/Card/CardFixed';
import { cardMainTopology } from '../../../../Common/topologies/Card/CardMain';
import { containerTopology } from '../../../../Common/topologies/Container';
import { fullResourceTopology } from '../../../../Common/topologies/FullResource';
import argu from '../../../lib/argu';

const Creator: FC<PropertyProps> = ({ linkedProp }) => (
  <Heading size={HeadingSize.MD}>
    {linkedProp.value}
  </Heading>
);

Creator.type = argu.Notification;

Creator.property = schema.name;

Creator.topology = [
  fullResourceTopology,
  cardFixedTopology,
  cardMainTopology,
  cardTopology,
  containerTopology,
];

export default register(Creator);
