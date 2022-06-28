import { register, useProperty } from 'link-redux';
import React from 'react';

import { contentsProps, titleProps } from '../../../../../ontology/app';
import qb from '../../../../../ontology/qb';
import { tableRowTopology } from '../../../../../topologies';
import TableHeaderCell from '../../../../../topologies/TableHeaderCell';

const MeasurePropertyTableRow = () => {
  const [name] = useProperty(titleProps);
  const [text] = useProperty(contentsProps);

  return(
    <TableHeaderCell title={text?.value}>
      {name?.value}
    </TableHeaderCell>
  );
};

MeasurePropertyTableRow.type = qb.MeasureProperty;

MeasurePropertyTableRow.topology = tableRowTopology;

export default register(MeasurePropertyTableRow);