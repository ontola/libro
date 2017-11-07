import React from 'react';
import { LinkedObjectContainer } from 'link-redux';

import LinkedRenderStore, { linkedPropVal, NS } from '../../../helpers/LinkedRenderStore';

const propTypes = {
  linkedProp: linkedPropVal,
};

const VoteEvents = ({ linkedProp }) =>
  (<LinkedObjectContainer
    object={linkedProp}
    topology={NS.argu('voteEventCollection')}
  />);

VoteEvents.propTypes = propTypes;

LinkedRenderStore.registerRenderer(
  VoteEvents,
  NS.schema('CreativeWork'),
  NS.argu('voteEvents')
);

export default VoteEvents;
