import { Literal } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import { FC, register } from 'link-redux';
import React from 'react';

import { allTopologiesExcept } from '../../../../../topologies';
import { tableRowTopology } from '../../../../Table/topologies/TableRow';
import DetailDate from '../../../components/DetailDate';

interface PropTypes {
  linkedProp: Literal;
}

const DateCreatedDetail: FC<PropTypes> = ({ linkedProp }) => (
  <DetailDate dateCreated={linkedProp} />
);

DateCreatedDetail.type = schema.Thing;

DateCreatedDetail.topology = allTopologiesExcept(tableRowTopology);

DateCreatedDetail.property = schema.dateCreated;

export default register(DateCreatedDetail);
