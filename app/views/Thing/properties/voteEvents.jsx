import LinkedRenderStore from 'link-lib';
import { LinkedResourceContainer, linkedPropType, Property } from 'link-redux';
import React from 'react';

import { allTopologies, NS } from '../../../helpers/LinkedRenderStore';

const propTypes = {
  linkedProp: linkedPropType,
};

const VoteEvents = ({ linkedProp }) => (
  <LinkedResourceContainer
    subject={linkedProp}
  >
    <Property label={NS.argu('members')} />
  </LinkedResourceContainer>
);

VoteEvents.propTypes = propTypes;

export default LinkedRenderStore.registerRenderer(
  VoteEvents,
  NS.schema('Thing'),
  NS.argu('voteEvents'),
  allTopologies
);
