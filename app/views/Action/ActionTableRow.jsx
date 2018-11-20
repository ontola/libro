import { Property, register } from 'link-redux';
import React from 'react';

import { LDLink } from '../../components';
import { NS } from '../../helpers/LinkedRenderStore';
import { tableRowTopology } from '../../topologies/TableRow';
import TableCell from '../../topologies/TableCell';

class ActionTableRow extends React.PureComponent {
  static type = NS.schema('Action');

  static topology = tableRowTopology;

  render() {
    return (
      <TableCell>
        <LDLink>
          <Property label={NS.schema('target')}>
            <Property label={NS.schema('image')} />
          </Property>
        </LDLink>
      </TableCell>
    );
  }
}

export default register(ActionTableRow);
