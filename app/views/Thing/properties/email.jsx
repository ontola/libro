import { linkedPropType, register } from 'link-redux';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';
import { tableRowTopology } from '../../../topologies/TableRow';
import TableCell from '../../../topologies/TableCell';

const propTypes = {
  linkedProp: linkedPropType,
};

class Email extends React.PureComponent {
  static type = NS.schema('Thing');

  static property = NS.schema('email');

  static topology = tableRowTopology;

  static propTypes = propTypes;

  render() {
    const { linkedProp } = this.props;

    return (
      <TableCell>
        {linkedProp.value}
      </TableCell>
    );
  }
}

export default register(Email);
