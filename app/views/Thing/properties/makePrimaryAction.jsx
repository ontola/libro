import { linkedPropType, register, LinkedResourceContainer } from 'link-redux';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';
import { tableRowTopology } from '../../../topologies/TableRow';
import TableCell from '../../../topologies/TableCell';

const propTypes = {
  linkedProp: linkedPropType,
};

class MakePrimaryAction extends React.PureComponent {
  static type = NS.argu('EmailAddress');

  static property = NS.argu('makePrimaryAction');

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

export default register(MakePrimaryAction);
