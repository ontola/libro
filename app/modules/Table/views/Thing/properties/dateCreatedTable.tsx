import { isLiteral } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import {
  FC,
  PropertyProps,
  register,
} from 'link-redux';
import React from 'react';

import RelativeDate from '../../../../Common/components/RelativeDate';
import { tableRowTopology } from '../../../topologies/TableRow';

const DateCreatedTable: FC<PropertyProps> = ({ linkedProp }) => (
  isLiteral(linkedProp) ? <RelativeDate date={linkedProp} /> : null
);

DateCreatedTable.type = schema.Thing;

DateCreatedTable.topology = tableRowTopology;

DateCreatedTable.property = schema.dateCreated;

export default register(DateCreatedTable);
