import * as rdfx from '@ontologies/rdf';
import * as schema from '@ontologies/schema';
import { register } from 'link-redux';
import React from 'react';

import TableCell from '../../../topologies/TableCell';
import { tableRowTopology } from '../../../topologies/TableRow';

interface ThingPredicateTableRowProps {
  children: React.ReactNode;
}

const ThingPredicateTableRow = ({ children }: ThingPredicateTableRowProps): JSX.Element => (
  <TableCell>
    {children}
  </TableCell>
);

ThingPredicateTableRow.type = schema.Thing;

ThingPredicateTableRow.property = rdfx.predicate;

ThingPredicateTableRow.topology = tableRowTopology;

export default register(ThingPredicateTableRow);
