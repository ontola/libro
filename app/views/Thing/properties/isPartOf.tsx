import * as schema from '@ontologies/schema';
import {
  PropertyProps,
  Resource,
  register,
} from 'link-redux';
import React from 'react';

import { parentProps } from '../../../ontology/app';
import { containerTopology, fullResourceTopology } from '../../../topologies';
import BreadcrumbsBar from '../../../topologies/BreadcrumbsBar';

const IsPartOfContainer = ({ linkedProp }: PropertyProps): JSX.Element => (
  <BreadcrumbsBar>
    <Resource
      first
      subject={linkedProp}
    />
  </BreadcrumbsBar>
);

IsPartOfContainer.type = schema.Thing;

IsPartOfContainer.property = parentProps;

IsPartOfContainer.topology = [
  containerTopology,
  fullResourceTopology,
];

export default register(IsPartOfContainer);
