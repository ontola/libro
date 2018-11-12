import { linkedPropType, LinkedResourceContainer, register } from 'link-redux';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';
import { tableRowTopology } from '../../../topologies/TableRow';
import TableCell from '../../../topologies/TableCell';

const propTypes = {
  linkedProp: linkedPropType,
};

class Member extends React.PureComponent {
  static type = NS.schema('Thing');

  static property = NS.org('member');

  static topology = tableRowTopology;

  static propTypes = propTypes;

  render() {
    const { linkedProp } = this.props;

    return (
      <TableCell>
        <LinkedResourceContainer subject={linkedProp} />
      </TableCell>
    );
  }
}

export default register(Member);
