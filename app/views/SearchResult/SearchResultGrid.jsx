import {
  Property,
  register,
} from 'link-redux';
import React from 'react';

import ontola from '../../ontology/ontola';
import { gridTopology } from '../../topologies/Grid';
import { useCurrentPage } from '../../hooks/useCurrentPage';

export const SearchResultGrid = () => {
  const [_, setCurrentPage] = useCurrentPage(true);

  return (
    <Property label={ontola.query} setCurrentPage={setCurrentPage} />
  );
};

SearchResultGrid.type = ontola.SearchResult;

SearchResultGrid.topology = gridTopology;

export default register(SearchResultGrid);
