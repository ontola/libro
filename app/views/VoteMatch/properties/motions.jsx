import LinkedRenderStore from 'link-lib';
import { LinkedResourceContainer, linkedPropType } from 'link-redux';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';

const propTypes = {
  linkedProp: linkedPropType,
};

const Motions = ({ linkedProp }) => (
  <LinkedResourceContainer
    subject={linkedProp}
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
