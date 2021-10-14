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

const IsPartOfContainer = ({ linkedProp }: PropertyProps): JSX.Element => (
  <BreadcrumbsBar>
    <Resource subject={linkedProp} />
  </BreadcrumbsBar>
);

IsPartOfContainer.type = schema.Thing;

IsPartOfContainer.property = parentProps;

IsPartOfContainer.topology = containerTopology;

export default register(IsPartOfContainer);
