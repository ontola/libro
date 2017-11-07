import { LinkedObjectContainer, linkedPropType } from 'link-redux';
import React from 'react';

import LinkedRenderStore, { NS } from '../../../helpers/LinkedRenderStore';

const propTypes = {
  linkedProp: linkedPropType,
};

const Motions = ({ linkedProp }) => (
  <LinkedObjectContainer
    object={linkedProp}
    topology={NS.argu('voteMatch')}
  />
);

Motions.propTypes = propTypes;

LinkedRenderStore.registerRenderer(
  Motions,
  NS.argu('VoteMatch'),
  NS.argu('motions')
);

export default Motions;
