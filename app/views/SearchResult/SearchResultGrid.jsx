import {
  Property,
  register,
  subjectType,
} from 'link-redux';
import React from 'react';

import ontola from '../../ontology/ontola';
import { gridTopology } from '../../topologies/Grid';
import { useCurrentCollectionResource } from '../../hooks/useCurrentCollectionResource';

export const SearchResultGrid = ({ subject }) => {
  const [_, setCollectionResource] = useCurrentCollectionResource(true, subject);

  return (
    <Property label={ontola.query} setCurrentPage={setCollectionResource} />
  );
};

SearchResultGrid.type = ontola.SearchResult;

SearchResultGrid.topology = gridTopology;

SearchResultGrid.propTypes = {
  subject: subjectType,
};

export default register(SearchResultGrid);
