import { normalizeType } from 'link-lib';
import { Property, register } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { NamedNode } from 'rdflib';

import { NS } from '../../helpers/LinkedRenderStore';
import TableRow from '../../topologies/TableRow';
import { tableTopology } from '../../topologies/Table';

class ThingTable extends React.PureComponent {
  static type = NS.schema('Thing');

  static topology = tableTopology;

  static propTypes = {
    columns: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.instanceOf(NamedNode),
        PropTypes.arrayOf(PropTypes.instanceOf(NamedNode)),
      ])
    ),
  };

  render() {
    const { columns } = this.props;

    return (
      <TableRow>
        {columns.map(column => (
          <Property key={normalizeType(column)[0].value} label={column} />
        ))}
      </TableRow>
    );
  }
}

export default register(ThingTable);
