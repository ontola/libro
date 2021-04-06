import * as schema from '@ontologies/schema';
import {
  Resource,
  linkedPropType,
  register,
} from 'link-redux';
import React from 'react';

import { BreadcrumbsBar } from '../../../components/Breadcrumbs';
import { parentProps } from '../../../ontology/app';
import { containerTopology } from '../../../topologies/Container';

const IsPartOfContainer = ({ linkedProp }) => (
  <BreadcrumbsBar>
    <Resource subject={linkedProp} />
  </BreadcrumbsBar>
);

IsPartOfContainer.type = schema.Thing;

IsPartOfContainer.property = parentProps;

IsPartOfContainer.topology = containerTopology;

IsPartOfContainer.propTypes = {
  linkedProp: linkedPropType,
};

export default register(IsPartOfContainer);
