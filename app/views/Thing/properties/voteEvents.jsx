import LinkedRenderStore from 'link-lib';
import { LinkedResourceContainer, linkedPropType } from 'link-redux';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';

const propTypes = {
  linkedProp: linkedPropType,
};

const VoteEvents = ({ linkedProp }) => (
  <LinkedResourceContainer
    subject={linkedProp}
    topology={NS.argu('voteEventCollection')}
  />
);

VoteEvents.propTypes = propTypes;

export default LinkedRenderStore.registerRenderer(
  VoteEvents,
  NS.schema('Thing'),
  NS.argu('voteEvents')
);
