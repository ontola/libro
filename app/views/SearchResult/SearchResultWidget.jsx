import as from '@ontologies/as';
import {
  linkType,
  register,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router';

import SearchForm from '../../components/SearchForm';
import { NS } from '../../helpers/LinkedRenderStore';
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

SearchResultWidget.type = NS.argu('SearchResult');

SearchResultWidget.topology = widgetTopologyTopology;

SearchResultWidget.hocs = [withRouter];

SearchResultWidget.mapDataToProps = {
  collectionDisplay: NS.ontola('collectionDisplay'),
  query: NS.argu('query'),
  searchTemplate: NS.ontola('searchTemplate'),
  took: NS.argu('took'),
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
