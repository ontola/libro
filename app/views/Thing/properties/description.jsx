import LinkedRenderStore from 'link-lib';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';
import { allTopologies } from '../../../topologies';

export default LinkedRenderStore.registerRenderer(
  ({ linkedProp }) => <p>{linkedProp.value}</p>,
  [
    NS.schema('Thing'),
    NS.sh('Shape'),
    NS.sh('NodeShape'),
  ],
  [NS.schema('description'), NS.sh('description')],
  allTopologies
);
