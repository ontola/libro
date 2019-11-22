import {
  linkType,
  register,
} from 'link-redux';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';
import TableHeaderCell from '../../topologies/TableHeaderCell';
import { tableHeaderRowTopology } from '../../topologies/TableHeaderRow';

const ThingTableHeaderRow = ({ name }) => (
  <TableHeaderCell>
    {name?.value}
  </TableHeaderCell>
);

ThingTableHeaderRow.type = NS.schema('Thing');

ThingTableHeaderRow.topology = tableHeaderRowTopology;

ThingTableHeaderRow.mapDataToProps = {
  name: {
    label: [NS.schema('name'), NS.rdfs('label')],
  },
};

ThingTableHeaderRow.propTypes = {
  name: linkType,
};


export default register(ThingTableHeaderRow);
