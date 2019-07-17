import LinkedRenderStore from 'link-lib';
import { LinkedResourceContainer, Property, linkedPropType } from 'link-redux';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';
import { allTopologies } from '../../../topologies';

const propTypes = {
  linkedProp: linkedPropType,
};

const VoteEvents = ({ linkedProp }) => (
  <LinkedResourceContainer
    subject={linkedProp}
  >
    <Property label={NS.as('items')} />
  </LinkedResourceContainer>
);

VoteEvents.propTypes = propTypes;

export default LinkedRenderStore.registerRenderer(
  VoteEvents,
  NS.schema('Thing'),
  NS.argu('voteEvents'),
  allTopologies
);
