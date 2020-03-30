import as from '@ontologies/as';
import {
  linkType,
  register,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router';

import SearchForm from '../../components/SearchForm';
import argu from '../../ontology/argu';
import ontola from '../../ontology/ontola';
import { gridTopology } from '../../topologies/Grid';

export const SearchResultGrid = ({
  history,
  iriTemplate,
  query,
}) => (
  <SearchForm
    autoFocus={false}
    history={history}
    iriTemplate={iriTemplate}
    query={query}
  />
);

SearchResultGrid.type = argu.SearchResult;

SearchResultGrid.topology = gridTopology;

SearchResultGrid.hocs = [withRouter];

SearchResultGrid.mapDataToProps = {
  collectionDisplay: ontola.collectionDisplay,
  iriTemplate: ontola.iriTemplate,
  query: argu.query,
  took: argu.took,
  totalItems: as.totalItems,
};

SearchResultGrid.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  intl: PropTypes.shape({
    formatMessage: PropTypes.func,
  }),
  iriTemplate: linkType,
  query: linkType,
};

export default register(SearchResultGrid);
