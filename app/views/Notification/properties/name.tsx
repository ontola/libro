import * as schema from '@ontologies/schema';
import {
  FC,
  PropertyProps,
  register,
} from 'link-redux';
import React from 'react';

import Heading, { HeadingSize } from '../../../components/Heading';
import argu from '../../../ontology/argu';
import { cardTopology } from '../../../topologies/Card';
import { cardFixedTopology } from '../../../topologies/Card/CardFixed';
import { cardMainTopology } from '../../../topologies/Card/CardMain';
import { containerTopology } from '../../../topologies/Container';
import { fullResourceTopology } from '../../../topologies/FullResource';

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
