import { Property, register } from 'link-redux';
import React from 'react';

import { LDLink } from '../../components';
import { NS } from '../../helpers/LinkedRenderStore';
import { tableRowTopology } from '../../topologies/TableRow';

class ActionTableRow extends React.PureComponent {
  static type = NS.schema('Action');

  static topology = tableRowTopology;

  render() {
    return (
      <LDLink>
        <Property label={NS.schema('target')}>
          <Property label={NS.schema('image')} />
        </Property>
      </LDLink>
    );
  }
}

export default register(ActionTableRow);
