import LinkedRenderStore from 'link-lib';
import { LinkedObjectContainer, linkedPropType } from 'link-redux';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';

const propTypes = {
  linkedProp: linkedPropType,
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
