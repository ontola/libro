import {
  register,
  useProperty,
} from 'link-redux';
import React from 'react';

import qb from '../../../ontology/qb';
import TableHeaderCell from '../../../topologies/TableHeaderCell';
import { tableRowTopology } from '../../../topologies/TableRow';
import { titleProps } from '../../../ontology/app';

const MeasurePropertyTableRow = () => {
  const [name] = useProperty(titleProps);

  return(
    <TableHeaderCell>
      {name?.value}
    </TableHeaderCell>
  );
};

MeasurePropertyTableRow.type = qb.MeasureProperty;

MeasurePropertyTableRow.topology = tableRowTopology;

export default register(MeasurePropertyTableRow);
