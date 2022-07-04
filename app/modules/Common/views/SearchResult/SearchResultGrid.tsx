import {
  FC,
  Property,
  register,
} from 'link-redux';
import React from 'react';

import ontola from '../../../Kernel/ontology/ontola';
import { gridTopology } from '../../topologies/Grid';

export const SearchResultGrid: FC = () => (
  <Property label={ontola.query} />
);

SearchResultGrid.type = ontola.SearchResult;

SearchResultGrid.topology = gridTopology;

export default register(SearchResultGrid);
