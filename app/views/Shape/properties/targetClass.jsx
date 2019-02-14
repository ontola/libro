import { register } from 'link-redux';
// import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';
import { allTopologies } from '../../../topologies';

const TargetClass = ({ linkedProp }) => {
  if (linkedProp === NS.argu('MediaObject')) {
    return 'Show editor';
  }

  return null;
};

TargetClass.type = NS.sh('NodeShape');
TargetClass.property = NS.sh('targetClass');
TargetClass.topology = allTopologies;

export default register(TargetClass);
