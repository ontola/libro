import * as schema from '@ontologies/schema';
import {
  FC,
  PropertyProps,
  register,
} from 'link-redux';
import React from 'react';
import emoji from 'react-easy-emoji';

import Heading, { HeadingSize } from '../../../components/Heading';
import ontola from '../../../ontology/ontola';
import { cardMainTopology } from '../../../topologies/Card/CardMain';

const FollowUpActionName: FC<PropertyProps> = ({ linkedProp }) => (
  <Heading size={HeadingSize.XL}>
    {emoji(linkedProp.value)}
  </Heading>
);

FollowUpActionName.type = ontola['Create::FollowUp'];

FollowUpActionName.topology = cardMainTopology;

FollowUpActionName.property = schema.name;

export default register(FollowUpActionName);
