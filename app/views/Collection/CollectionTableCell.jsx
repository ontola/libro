import as from '@ontologies/as';
import { Property, register } from 'link-redux';
import React from 'react';

import { LDLink } from '../../components';
import { NS } from '../../helpers/LinkedRenderStore';
import { tableCellTopology } from '../../topologies/TableCell';

import { CollectionTypes } from './types';

class CollectionTableCell extends React.PureComponent {
  static type = CollectionTypes;

  static topology = tableCellTopology;

  render() {
    return (
      <span>
        <LDLink>
          <Property label={as.totalItems} />
        </LDLink>
        <Property label={NS.ontola('createAction')} />
      </span>
    );
  }
}

export default register(CollectionTableCell);
