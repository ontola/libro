import * as schema from '@ontologies/schema';
import {
  FC,
  PropertyProps,
  register,
} from 'link-redux';
import React from 'react';

import Heading, { HeadingSize } from '../../../../Common/components/Heading';
import {
  cardFixedTopology,
  cardMainTopology,
  cardTopology,
  containerTopology,
  fullResourceTopology,
} from '../../../../Common/topologies';
import argu from '../../../ontology/argu';

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
