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

SearchResultWidget.mapDataToProps = [
  NS.argu('query'),
  NS.argu('took'),
  NS.as('totalItems'),
  NS.ontola('collectionDisplay'),
  NS.ontola('searchTemplate'),
];

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
