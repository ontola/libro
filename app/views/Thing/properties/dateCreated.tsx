import { Literal } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import { FC, register } from 'link-redux';
import React from 'react';

import DetailDate from '../../../components/DetailDate';
import RelativeDate from '../../../components/RelativeDate';
import { allTopologiesExcept } from '../../../topologies';
import { tableRowTopology } from '../../../topologies/TableRow';

interface PropTypes {
  linkedProp: Literal;
}

const DateCreated: FC<PropTypes> = ({ linkedProp }) => (
  <RelativeDate date={linkedProp} />
);

DateCreated.type = schema.Thing;

DateCreated.topology = tableRowTopology;

DateCreated.property = schema.dateCreated;

const DateCreatedDetail: FC<PropTypes> = ({ linkedProp }) => (
  <DetailDate dateCreated={linkedProp} />
);

DateCreatedDetail.type = schema.Thing;

DateCreatedDetail.topology = allTopologiesExcept(tableRowTopology);

DateCreatedDetail.property = schema.dateCreated;

export default [
  register(DateCreated),
  register(DateCreatedDetail),
];
