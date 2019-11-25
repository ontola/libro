import schema from '@ontologies/schema';
import sh from '@ontologies/shacl';
import LinkedRenderStore from 'link-lib';
import React from 'react';

import { allTopologies } from '../../../topologies';

export default LinkedRenderStore.registerRenderer(
  ({ linkedProp }) => <p>{linkedProp.value}</p>,
  [
    schema.Thing,
    sh.Shape,
    sh.NodeShape,
  ],
  [schema.description, sh.description],
  allTopologies
);
