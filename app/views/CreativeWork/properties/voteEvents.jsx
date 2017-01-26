import React, { PropTypes } from 'react';
import { LinkedObjectContainer } from 'link-redux';

import LinkedRenderStore from '../../../helpers/LinkedRenderStore';

const propTypes = {
  linkedProp: PropTypes.object,
};

const VoteEvents = ({ linkedProp }) =>
  <LinkedObjectContainer
    object={linkedProp}
    topology="voteEventCollection"
  />;

VoteEvents.propTypes = propTypes;

LinkedRenderStore.registerRenderer(
  VoteEvents,
  'http://schema.org/CreativeWork',
  'argu:voteEvents'
);

export default VoteEvents;
