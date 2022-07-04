import { register, useProperty } from 'link-redux';
import React from 'react';

import qb from '../../../../../ontology/qb';
import { contentsProps, titleProps } from '../../../../Common/ontology/app';
import TableHeaderCell from '../../../../Table/topologies/TableHeaderCell';
import { tableRowTopology } from '../../../../Table/topologies/TableRow';

const MeasurePropertyTableRow = () => {
  const [name] = useProperty(titleProps);
  const [text] = useProperty(contentsProps);

  return (
    <TableHeaderCell title={text?.value}>
      {name?.value}
    </TableHeaderCell>
  );
};

MeasurePropertyTableRow.type = qb.MeasureProperty;

MeasurePropertyTableRow.topology = tableRowTopology;

export default register(MeasurePropertyTableRow);
