import * as as from '@ontologies/as';
import { Property, register } from 'link-redux';
import React from 'react';

import LDLink from '../../components/LDLink';
import ontola from '../../ontology/ontola';
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
        <Property label={ontola.createAction} />
      </span>
    );
  }
}

export default register(CollectionTableCell);
