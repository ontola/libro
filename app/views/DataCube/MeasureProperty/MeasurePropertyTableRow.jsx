import * as dcterms from '@ontologies/dcterms';
import * as rdfs from '@ontologies/rdfs';
import * as schema from '@ontologies/schema';
import { linkType } from 'link-redux';
import React from 'react';

import qb from '../../../ontology/qb';
import TableHeaderCell from '../../../topologies/TableHeaderCell';
import { tableRowTopology } from '../../../topologies/TableRow';

const MeasurePropertyTableRow = ({ name, text }) => (
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

MeasurePropertyTableRow.propTypes = {
  name: linkType,
  text: linkType,
};

export default MeasurePropertyTableRow;
