import schema from '@ontologies/schema';
import { linkedPropType, register } from 'link-redux';
import React from 'react';

import DetailDate from '../../../components/DetailDate';
import { allTopologies } from '../../../topologies';

const propTypes = {
  linkedProp: linkedPropType,
};

const StartDate = ({ linkedProp }) => (
  <DetailDate startDate={new Date(linkedProp.value)} />
);

StartDate.type = schema.Thing;

StartDate.property = schema.startDate;

StartDate.topology = allTopologies;

StartDate.propTypes = propTypes;

export default register(StartDate);
