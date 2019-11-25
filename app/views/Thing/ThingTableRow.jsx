import as from '@ontologies/as';
import schema from '@ontologies/schema';
import { Property, register } from 'link-redux';
import React from 'react';

import { tableRowTopology } from '../../topologies/TableRow';

class ThingTableRow extends React.PureComponent {
  static type = schema.Thing;

  static topology = tableRowTopology;

  render() {
    return (
      <React.Fragment>
        <Property label={[schema.name, as.name]} />
      </React.Fragment>
    );
  }
}

export default register(ThingTableRow);
