import { linkedPropType, register } from 'link-redux';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';
import { tableRowTopology } from '../../../topologies/TableRow';
import TableCell from '../../../topologies/TableCell';

class Invitee extends React.PureComponent {
  static type = NS.schema('Thing');

  static property = NS.argu('invitee');

  static topology = tableRowTopology;

  static propTypes = {
    linkedProp: linkedPropType,
  };

  render() {
    const { linkedProp } = this.props;

    return (
      <TableCell>
        {linkedProp.value}
      </TableCell>
    );
  }
}

export default register(Invitee);
