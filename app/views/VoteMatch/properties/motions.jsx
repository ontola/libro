import LinkedRenderStore from 'link-lib';
import { LinkedObjectContainer, linkedPropType } from 'link-redux';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';

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
