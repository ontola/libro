import { LinkedObjectContainer } from 'link-redux';
import React from 'react';

import LinkedRenderStore, { linkedPropVal } from '../../../helpers/LinkedRenderStore';

const propTypes = {
  linkedProp: linkedPropVal,
};

const Motions = ({ linkedProp }) => (
  <LinkedObjectContainer
    object={linkedProp}
    topology="voteMatch"
  />
);

Motions.propTypes = propTypes;

LinkedRenderStore.registerRenderer(
  Motions,
  'argu:VoteMatch',
  'argu:motions'
);

export default Motions;
