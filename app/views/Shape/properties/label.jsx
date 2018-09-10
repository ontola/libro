import LinkedRenderStore from 'link-lib';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';
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
  [NS.sh('Shape'), NS.sh('NodeShape')],
  NS.rdfs('label'),
  allTopologies
);
