import {
  register,
  useProperty,
} from 'link-redux';
import React from 'react';

import qb from '../../../ontology/qb';
import { tableRowTopology } from '../../../topologies';
import TableHeaderCell from '../../../topologies/TableHeaderCell';
import { contentsProps, titleProps } from '../../../ontology/app';

const MeasurePropertyTableRow = () => {
  const [name] = useProperty(titleProps);
  const [text] = useProperty(contentsProps);

  return(
    <TableHeaderCell elementProps={{ title: text?.value }}>
      {name?.value}
    </TableHeaderCell>
  );
};

MeasurePropertyTableRow.type = qb.MeasureProperty;

MeasurePropertyTableRow.topology = tableRowTopology;

export default register(MeasurePropertyTableRow);
