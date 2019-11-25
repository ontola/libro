import schema from '@ontologies/schema';
import { linkedPropType, register } from 'link-redux';
import React from 'react';

import { DetailDate } from '../../../components';
import { allTopologies } from '../../../topologies';

const propTypes = {
  linkedProp: linkedPropType,
};

const DateCreated = ({ linkedProp }) => (
  <DetailDate datePublished={new Date(linkedProp.value)} />
);

DateCreated.type = schema.Thing;

DateCreated.property = schema.datePublished;

DateCreated.topology = allTopologies;

DateCreated.propTypes = propTypes;

export default register(DateCreated);
