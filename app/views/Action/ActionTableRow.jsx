import * as schema from '@ontologies/schema';
import { Property, register } from 'link-redux';
import React from 'react';

import LDLink from '../../components/LDLink';
import { tableRowTopology } from '../../topologies/TableRow';

class ActionTableRow extends React.PureComponent {
  static type = schema.Action;

  static topology = tableRowTopology;

  render() {
    return (
      <LDLink>
        <Property label={schema.target}>
          <Property label={schema.image} />
        </Property>
      </LDLink>
    );
  }
}

export default register(ActionTableRow);
