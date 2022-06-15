import * as schema from '@ontologies/schema';
import {
  FC,
  PropertyProps,
  register,
} from 'link-redux';
import React from 'react';
import emoji from 'react-easy-emoji';

import ontola from '../../../../ontology/ontola';
import { cardMainTopology } from '../../../../topologies';
import Heading, { HeadingSize } from '../../../Common/components/Heading';

const FollowUpActionName: FC<PropertyProps> = ({ linkedProp }) => (
  <Heading size={HeadingSize.XL}>
    {emoji(linkedProp.value)}
  </Heading>
);

FollowUpActionName.type = ontola['Create::FollowUp'];

FollowUpActionName.topology = cardMainTopology;

FollowUpActionName.property = schema.name;

export default register(FollowUpActionName);
