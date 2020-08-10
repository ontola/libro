import {
  Property,
  register,
} from 'link-redux';
import React from 'react';

import ontola from '../../ontology/ontola';
import { gridTopology } from '../../topologies/Grid';
import { useCurrentCollectionResource } from '../../hooks/useCurrentCollectionResource';

export const SearchResultGrid = () => {
  const [_, setCollectionResource] = useCurrentCollectionResource(true);

  return (
    <Property label={ontola.query} setCurrentPage={setCollectionResource} />
  );
};

SearchResultGrid.type = ontola.SearchResult;

SearchResultGrid.topology = gridTopology;

export default register(SearchResultGrid);
