import RDFTypes from '@rdfdev/prop-types';
import * as schema from '@ontologies/schema';
import { register } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import TableCells from '../../components/TableCells';
import { tableTopology } from '../../topologies/Table';
import TableRow from '../../topologies/TableRow';

export const columnsType = PropTypes.arrayOf(
  PropTypes.oneOfType([
    RDFTypes.namedNode,
    PropTypes.arrayOf(RDFTypes.namedNode),
    PropTypes.instanceOf(Promise),
  ])
);

const ThingTable = ({ columns }) => (
  <TableRow>
    <TableCells columns={columns} />
  </TableRow>
);

ThingTable.type = schema.Thing;

ThingTable.topology = tableTopology;

ThingTable.propTypes = {
  columns: columnsType,
};

export default register(ThingTable);
