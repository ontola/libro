import { Property, register } from 'link-redux';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';
import { tableRowTopology } from '../../topologies/TableRow';

class ThingTableRow extends React.PureComponent {
  static type = NS.schema('Thing');

  static topology = tableRowTopology;

  render() {
    return (
      <React.Fragment>
        <Property label={[NS.schema('name'), NS.as('name')]} />
      </React.Fragment>
    );
  }
}

export default register(ThingTableRow);
