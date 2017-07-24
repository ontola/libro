import React from 'react';
import { LinkedObjectContainer } from 'link-redux';

import LinkedRenderStore, { linkedPropVal } from '../../../helpers/LinkedRenderStore';

const propTypes = {
  linkedProp: linkedPropVal,
};

const VoteEvents = ({ linkedProp }) =>
  <LinkedObjectContainer
    object={linkedProp}
    topology="argu:voteEventCollection"
  />;

VoteEvents.propTypes = propTypes;

LinkedRenderStore.registerRenderer(
  VoteEvents,
  'http://schema.org/CreativeWork',
  'argu:voteEvents'
);

export default VoteEvents;
