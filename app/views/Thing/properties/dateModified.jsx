import * as schema from '@ontologies/schema';
import { linkedPropType, register } from 'link-redux';
import React from 'react';

import DetailDate from '../../../components/DetailDate';
import { allTopologies } from '../../../topologies';

const propTypes = {
  linkedProp: linkedPropType,
};

const DateModified = ({ linkedProp }) => (
  <DetailDate dateCreated={new Date(linkedProp.value)} />
);

DateModified.type = schema.Thing;

DateModified.topology = allTopologies;

DateModified.property = schema.dateModified;

DateModified.propTypes = propTypes;

export default register(DateModified);
