import { register, useProperty } from 'link-redux';
import React from 'react';

import { tableRowTopology } from '../../../Table/topologies';
import datacube from '../../ontology/datacube';
import { contentsProps, titleProps } from '../../../Common/ontology/app';
import TableHeaderCell from '../../../Table/topologies/TableHeaderCell';

const MeasurePropertyTableRow = () => {
  const [name] = useProperty(titleProps);
  const [text] = useProperty(contentsProps);

  return (
    <TableHeaderCell title={text?.value}>
      {name?.value}
    </TableHeaderCell>
  );
};

MeasurePropertyTableRow.type = datacube.MeasureProperty;

MeasurePropertyTableRow.topology = tableRowTopology;

export default register(MeasurePropertyTableRow);
