import rdfs from '@ontologies/rdfs';
import schema from '@ontologies/schema';
import {
  linkType,
  register,
} from 'link-redux';
import React from 'react';

import TableHeaderCell from '../../topologies/TableHeaderCell';
import { tableHeaderRowTopology } from '../../topologies/TableHeaderRow';

const ThingTableHeaderRow = ({ name }) => (
  <TableHeaderCell>
    {name?.value}
  </TableHeaderCell>
);

ThingTableHeaderRow.type = schema.Thing;

ThingTableHeaderRow.topology = tableHeaderRowTopology;

ThingTableHeaderRow.mapDataToProps = {
  name: {
    label: [schema.name, rdfs.label],
  },
};

ThingTableHeaderRow.propTypes = {
  name: linkType,
};


export default register(ThingTableHeaderRow);
