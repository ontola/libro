import { LinkedObjectContainer, linkedPropType } from 'link-redux';
import React from 'react';

import LinkedRenderStore, { NS } from '../../../helpers/LinkedRenderStore';

const propTypes = {
  linkedProp: linkedPropType,
};

/**
 * Renders a vote event from a collection of vote events.
 * @returns {ReactElement} The vote event component
 */
const Members = ({ linkedProp }) => (
  <LinkedObjectContainer
    object={linkedProp}
    topology={NS.argu('voteEvent')}
  />
);

Members.propTypes = propTypes;

LinkedRenderStore.registerRenderer(
  Members,
  NS.argu('Collection'),
  NS.argu('members'),
  NS.argu('voteEventCollection')
);

export default Members;
