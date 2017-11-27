import { LinkedObjectContainer, linkedPropType } from 'link-redux';
import React from 'react';

import LinkedRenderStore, { NS } from '../../../helpers/LinkedRenderStore';

const propTypes = {
  linkedProp: linkedPropType,
};

const VoteEvents = ({ linkedProp }) => (
  <LinkedObjectContainer
    object={linkedProp}
    topology={NS.argu('voteEventCollection')}
  />
);

VoteEvents.propTypes = propTypes;

LinkedRenderStore.registerRenderer(
  VoteEvents,
  NS.schema('CreativeWork'),
  NS.argu('voteEvents')
);

export default VoteEvents;
