import { Property, register } from 'link-redux';
import React from 'react';

import { LDLink } from '../../components';
import { NS } from '../../helpers/LinkedRenderStore';
import { tableRowTopology } from '../../topologies/TableRow';

import { CollectionTypes } from './types';

class CollectionTableRow extends React.PureComponent {
  static type = CollectionTypes;

  static topology = tableRowTopology;

  render() {
    return (
      <span>
        <LDLink>
          <Property label={NS.as('totalItems')} />
        </LDLink>
        <Property label={NS.argu('createAction')} />
      </span>
    );
  }
}

export default register(CollectionTableRow);
