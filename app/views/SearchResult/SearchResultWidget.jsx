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
import { widgetTopologyTopology } from '../../topologies/WidgetTopology/WidgetTopology';

export const SearchResultWidget = ({
  history,
  query,
  searchTemplate,
}) => (
  <SearchForm
    history={history}
    query={query}
    searchTemplate={searchTemplate}
  />
);

SearchResultWidget.type = argu.ns('SearchResult');

SearchResultWidget.topology = widgetTopologyTopology;

SearchResultWidget.hocs = [withRouter];

SearchResultWidget.mapDataToProps = {
  collectionDisplay: ontola.collectionDisplay,
  query: argu.ns('query'),
  searchTemplate: ontola.searchTemplate,
  took: argu.ns('took'),
  totalItems: as.totalItems,
};

SearchResultWidget.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  intl: PropTypes.shape({
    formatMessage: PropTypes.func,
  }),
  query: linkType,
  searchTemplate: PropTypes.string,
};

export default register(SearchResultWidget);
