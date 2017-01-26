import React, { PropTypes } from 'react';
import { LinkedObjectContainer } from 'link-redux';

import LinkedRenderStore from '../../../helpers/LinkedRenderStore';

const propTypes = {
  linkedProp: PropTypes.object,
};

/**
 * Renders a vote event from a collection of vote events.
 * @returns {ReactElement} The vote event component
 */
const VoteEventCollection = ({ linkedProp }) => (
  <LinkedObjectContainer
    object={linkedProp}
    topology="voteEventCollection"
  />
);

VoteEventCollection.propTypes = propTypes;

LinkedRenderStore.registerRenderer(
  VoteEventCollection,
  'argu:LinkedRecord',
  'argu:VoteEventCollection'
);

export default VoteEventCollection;
