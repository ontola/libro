import { labelType, register } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';
import TableCell from '../../../topologies/TableCell';
import { tableRowTopology } from '../../../topologies/TableRow';

const ThingPredicateTableRow = ({ children, label }) => (
  <TableCell elementProps={{ property: label?.value }}>
    {children}
  </TableCell>
);

ThingPredicateTableRow.type = NS.schema('Thing');

ThingPredicateTableRow.property = NS.rdf('predicate');

ThingPredicateTableRow.topology = tableRowTopology;

ThingPredicateTableRow.propTypes = {
  children: PropTypes.element,
  label: labelType,
};

export default register(ThingPredicateTableRow);
