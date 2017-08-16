import { LinkedObjectContainer } from 'link-redux';
import React from 'react';

import LinkedRenderStore, { linkedPropVal, NS } from '../../../helpers/LinkedRenderStore';

const propTypes = {
  linkedProp: linkedPropVal,
};

const ComparedBeta = ({ linkedProp }) => (
  <LinkedObjectContainer
    object={linkedProp}
    topology={NS.argu('inline')}
  />
);

ComparedBeta.propTypes = propTypes;

LinkedRenderStore.registerRenderer(
  ComparedBeta,
  NS.argu('CompareCell'),
  NS.argu('comparedBeta')
);

export default ComparedBeta;
