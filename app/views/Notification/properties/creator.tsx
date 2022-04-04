import * as schema from '@ontologies/schema';
import {
  FC,
  PropertyProps,
  Resource,
  register,
} from 'link-redux';
import React from 'react';

import LDDetail from '../../../components/LDDetail';
import argu from '../../../ontology/argu';
import {
  cardMainTopology,
  cardTopology,
  containerTopology,
  detailsBarTopology,
  fullResourceTopology,
  navbarTopology,
} from '../../../topologies';

const Creator: FC<PropertyProps> = ({ linkedProp }) => (
  <Resource
    subject={linkedProp}
    topology={detailsBarTopology}
  >
    <LDDetail
      smallMargin
      text={undefined}
      title={undefined}
    />
  </Resource>
);

Creator.type = argu.Notification;

Creator.property = schema.creator;

Creator.topology = [
  fullResourceTopology,
  cardTopology,
  cardMainTopology,
  containerTopology,
  detailsBarTopology,
  navbarTopology,
];

export default register(Creator);
