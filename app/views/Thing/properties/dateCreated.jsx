import * as schema from '@ontologies/schema';
import { linkedPropType, register } from 'link-redux';
import React from 'react';

import DetailDate from '../../../components/DetailDate';
import { allTopologies } from '../../../topologies';

const propTypes = {
  linkedProp: linkedPropType,
};

const DateCreated = ({ linkedProp }) => (
  <DetailDate dateCreated={linkedProp} />
);

DateCreated.type = schema.Thing;

DateCreated.topology = allTopologies;

DateCreated.property = schema.dateCreated;

DateCreated.propTypes = propTypes;

export default register(DateCreated);
