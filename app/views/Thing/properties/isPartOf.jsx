import schema from '@ontologies/schema';
import {
  Resource,
  linkedPropType,
  register,
} from 'link-redux';
import React from 'react';

import { BreadcrumbsBar } from '../../../components/Breadcrumbs';
import { containerTopology } from '../../../topologies/Container';

const IsPartOfContainer = ({ linkedProp }) => (
  <BreadcrumbsBar>
    <Resource subject={linkedProp} />
  </BreadcrumbsBar>
);

IsPartOfContainer.type = schema.Thing;

IsPartOfContainer.property = schema.isPartOf;

IsPartOfContainer.topology = containerTopology;

IsPartOfContainer.propTypes = {
  linkedProp: linkedPropType,
};

export default register(IsPartOfContainer);
