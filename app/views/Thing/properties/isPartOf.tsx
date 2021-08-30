import * as schema from '@ontologies/schema';
import {
  PropertyProps,
  Resource,
  register,
} from 'link-redux';
import React from 'react';

import { BreadcrumbsBar } from '../../../components/Breadcrumbs';
import { parentProps } from '../../../ontology/app';
import { containerTopology } from '../../../topologies/Container';
import { fullResourceTopology } from '../../../topologies/FullResource';

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
