import { LinkedObjectContainer } from 'link-redux';
import React from 'react';

import LinkedRenderStore, { linkedPropVal } from '../../../helpers/LinkedRenderStore';

const propTypes = {
  linkedProp: linkedPropVal,
};

const ComparedBeta = ({ linkedProp }) => (
  <LinkedObjectContainer
    object={linkedProp}
    topology="argu:inline"
  />
);

ComparedBeta.propTypes = propTypes;

LinkedRenderStore.registerRenderer(
  ComparedBeta,
  'argu:CompareCell',
  'argu:comparedBeta'
);

export default ComparedBeta;
