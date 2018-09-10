import LinkedRenderStore from 'link-lib';
import { LinkedResourceContainer, linkedPropType } from 'link-redux';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';
import { inlineTopology } from '../../../topologies/Inline';

const propTypes = {
  linkedProp: linkedPropType,
};

const ComparedBeta = ({ linkedProp }) => (
  <LinkedResourceContainer
    subject={linkedProp}
    topology={inlineTopology}
  />
);

ComparedBeta.propTypes = propTypes;

LinkedRenderStore.registerRenderer(
  ComparedBeta,
  NS.argu('CompareCell'),
  NS.argu('comparedBeta')
);

export default ComparedBeta;
