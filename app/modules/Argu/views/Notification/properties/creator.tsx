import * as schema from '@ontologies/schema';
import {
  FC,
  PropertyProps,
  Resource,
  register,
} from 'link-redux';
import React from 'react';

import LDDetail from '../../../../Common/components/LDDetail';
import {
  cardMainTopology,
  cardTopology,
  containerTopology,
  detailsBarTopology,
  fullResourceTopology,
} from '../../../../Common/topologies';
import { navbarTopology } from '../../../../NavBar/topologies';
import argu from '../../../ontology/argu';

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
