import { linkType } from 'link-redux';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';
import TableHeaderCell from '../../../topologies/TableHeaderCell';
import { tableRowTopology } from '../../../topologies/TableRow';

const MeasurePropertyTableRow = ({ name, text }) => (
  <TableHeaderCell elementProps={{ title: text?.value }}>
    {name?.value}
  </TableHeaderCell>
);

MeasurePropertyTableRow.type = NS.qb('MeasureProperty');

MeasurePropertyTableRow.topology = tableRowTopology;

MeasurePropertyTableRow.mapDataToProps = {
  name: {
    label: [NS.schema('name'), NS.dc('label'), NS.rdfs('label')],
  },
  text: {
    label: [NS.schema('text'), NS.dc('description')],
  },
};

MeasurePropertyTableRow.propTypes = {
  name: linkType,
  text: linkType,
};

export default MeasurePropertyTableRow;