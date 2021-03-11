import * as as from '@ontologies/as';
import * as schema from '@ontologies/schema';
import { Property, register } from 'link-redux';
import React from 'react';

import { tableRowTopology } from '../../topologies/TableRow';

class ThingTableRow extends React.PureComponent {
  static type = schema.Thing;

  static topology = tableRowTopology;

  render() {
    return (
      <Property label={[schema.name, as.name]} />
    );
  }
}

export default register(ThingTableRow);
