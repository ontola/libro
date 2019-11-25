import rdfs from '@ontologies/rdfs';
import sh from '@ontologies/shacl';
import LinkedRenderStore from 'link-lib';
import React from 'react';

import ontola from '../../../ontology/ontola';
import { allTopologies } from '../../../topologies';

export default LinkedRenderStore.registerRenderer(
  ({ linkedProp }) => (
    <strong
      style={{
        fontWeight: 'bold',
        margin: '0 0 1em 0',
      }}
    >
      {linkedProp.value}
    </strong>
  ),
  [sh.Shape, sh.NodeShape, ontola.FormStep],
  rdfs.label,
  allTopologies
);
