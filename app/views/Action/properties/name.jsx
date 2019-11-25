import schema from '@ontologies/schema';
import { linkedPropType, register } from 'link-redux';
import React from 'react';
import emoji from 'react-easy-emoji';

import { Heading } from '../../../components';
import { NS } from '../../../helpers/LinkedRenderStore';
import { cardMainTopology } from '../../../topologies/Card/CardMain';

const FollowUpActionName = ({ linkedProp }) => (
  <Heading size={1}>
    {emoji(linkedProp.value)}
  </Heading>
);

FollowUpActionName.type = NS.ontola('Create::FollowUp');

FollowUpActionName.topology = cardMainTopology;

FollowUpActionName.property = schema.name;

FollowUpActionName.propTypes = {
  linkedProp: linkedPropType,
};

export default register(FollowUpActionName);
