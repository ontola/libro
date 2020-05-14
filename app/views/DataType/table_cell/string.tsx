import { Literal } from '@ontologies/core';
import rdfs from '@ontologies/rdfs';
import xsd from '@ontologies/xsd';
import { FC, register } from 'link-redux';
import React from 'react';

import { tableCellTopology } from '../../../topologies/TableCell';
import { tableRowTopology } from '../../../topologies/TableRow';

const StringTableCellRenderer: FC<{ linkedProp: Literal }> = ({ linkedProp }) => (
  <div style={{
    maxWidth: '20em',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  }}>
    {linkedProp.value}
  </div>
);

StringTableCellRenderer.type = rdfs.Literal;

StringTableCellRenderer.property = xsd.string;

StringTableCellRenderer.topology = [
  tableCellTopology,
  tableRowTopology,
];

export default register(StringTableCellRenderer);