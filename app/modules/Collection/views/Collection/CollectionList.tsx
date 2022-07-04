import * as as from '@ontologies/as';
import { SomeTerm } from '@ontologies/core';
import {
  FC,
  Property,
  register,
  useNumbers,
} from 'link-redux';
import React from 'react';

import { listTopology } from '../../../Common/topologies/List';
import ontola from '../../../Kernel/ontology/ontola';

import { CollectionTypes } from './types';

export interface CollectionListProps {
  to: SomeTerm;
}

const CollectionList: FC<CollectionListProps> = ({ to }) => {
  const [totalItems] = useNumbers(as.totalItems);

  if (totalItems === 0) {
    return null;
  }

  return (
    <React.Fragment>
      <Property
        forceRender
        insideCollection
        label={ontola.pages}
      />
      <Property
        label={as.totalItems}
        to={to}
      />
    </React.Fragment>
  );
};

CollectionList.type = CollectionTypes;

CollectionList.topology = [
  listTopology,
];

export default register(CollectionList);
