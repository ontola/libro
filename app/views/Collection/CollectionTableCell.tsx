import * as as from '@ontologies/as';
import {
  FC,
  Property,
  register,
} from 'link-redux';
import React from 'react';

import useCollectionRefresh from '../../components/Collection/useCollectionRefresh';
import LDLink from '../../components/LDLink';
import ontola from '../../ontology/ontola';
import { tableCellTopology } from '../../topologies/TableCell';

import { CollectionTypes } from './types';

const CollectionTableCell: FC = ({
  subject,
}) => {
  useCollectionRefresh(subject);

  return (
    <span>
      <LDLink>
        <Property label={as.totalItems} />
      </LDLink>
      <Property label={ontola.createAction} />
    </span>
  );
};

CollectionTableCell.type = CollectionTypes;

CollectionTableCell.topology = tableCellTopology;

export default register(CollectionTableCell);
