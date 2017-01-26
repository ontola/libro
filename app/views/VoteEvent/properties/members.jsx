import { LinkedObjectContainer } from 'link-redux';
import React, { PropTypes } from 'react';

import LinkedRenderStore from '../../../helpers/LinkedRenderStore';

const propTypes = {
  linkedProp: PropTypes.object,
};

/**
 * Renders a vote event from a collection of vote events.
 * @returns {ReactElement} The vote event component
 */
const Members = ({ linkedProp }) => (
  <LinkedObjectContainer
    object={linkedProp}
    topology="voteEvent"
  />
);

Members.propTypes = propTypes;

LinkedRenderStore.registerRenderer(
  Members,
  'argu:Collection',
  'argu:members',
  'voteEventCollection'
);

export default Members;
