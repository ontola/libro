import schema from '@ontologies/schema';
import LinkedRenderStore from 'link-lib';
import React from 'react';

import { navbarTopology } from '../../../topologies/Navbar';

export default LinkedRenderStore.registerRenderer(
  ({ linkedProp }) => <p>{linkedProp.value}</p>,
  schema.Person,
  schema.name,
  navbarTopology
);
