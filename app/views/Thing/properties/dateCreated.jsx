import schema from '@ontologies/schema';
import { linkedPropType, register } from 'link-redux';
import React from 'react';

import DetailDate from '../../../components/DetailDate';
import RelativeDate from '../../../components/RelativeDate';
import { allTopologiesExcept } from '../../../topologies';
import { tableRowTopology } from '../../../topologies/TableRow';

const propTypes = {
  linkedProp: linkedPropType,
};

const DateCreatedDetail = ({ linkedProp }) => (
  <DetailDate dateCreated={new Date(linkedProp.value)} />
);

DateCreatedDetail.type = schema.Thing;

DateCreatedDetail.topology = allTopologiesExcept(tableRowTopology);

DateCreatedDetail.property = schema.dateCreated;

DateCreatedDetail.propTypes = propTypes;

const DateCreated = ({ linkedProp }) => (
  <RelativeDate date={linkedProp && new Date(linkedProp.value)} />
);

DateCreated.type = schema.Thing;

DateCreated.topology = tableRowTopology;

DateCreated.property = schema.dateCreated;

DateCreated.propTypes = propTypes;

export default [
  register(DateCreated),
  register(DateCreatedDetail),
];
