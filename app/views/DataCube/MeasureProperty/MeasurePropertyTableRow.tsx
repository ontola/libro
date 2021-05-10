import { Literal } from '@ontologies/core';
import * as dcterms from '@ontologies/dcterms';
import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import { FC, register } from 'link-redux';
import React from 'react';

import qb from '../../../ontology/qb';
import TableHeaderCell from '../../../topologies/TableHeaderCell';
import { tableRowTopology } from '../../../topologies/TableRow';

interface MeasurePropertyTableRowProps {
  name: Literal;
  text: Literal;
}

const MeasurePropertyTableRow: FC<MeasurePropertyTableRowProps> = ({ name, text }) => (
  <TableHeaderCell elementProps={{ title: text?.value }}>
    {name?.value}
  </TableHeaderCell>
);

MeasurePropertyTableRow.type = qb.MeasureProperty;

MeasurePropertyTableRow.topology = tableRowTopology;

MeasurePropertyTableRow.mapDataToProps = {
  name: {
    label: [schema.name, dcterms.ns('label'), rdfs.label],
  },
  text: {
    label: [schema.text, dcterms.description],
  },
};

export default register(MeasurePropertyTableRow);
