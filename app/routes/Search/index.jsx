// @flow
import './Search.scss';
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import {
	Hits, InitialLoader, NoHits, NumericRefinementListFilter, Pagination,
	Panel, RefinementListFilter, ResetFilters, Select, SortingSelector,
} from 'searchkit';

import { Button, Container, Drawer } from 'components';
import SearchResultContainer from 'containers/SearchResultContainer';
import { hitsSelector } from 'state/search/selectors';
import { toggleDrawer, setHitCount } from 'state/search/actions';

const propTypes = {
  setHitCountAction: PropTypes.func,
  hits: PropTypes.number,
  toggleDrawerAction: PropTypes.func,
};

const sortOption = [
	{ label: 'Relevantie', field: '_score', order: 'desc', defaultOption: true },
	{ label: 'Nieuw-Oud', field: 'date', order: 'desc' },
	{ label: 'Oud-Nieuw', field: 'date', order: 'asc' },
];

const dateFilterOptions = [
	{ title: 'Afgelopen 6 maanden', from: 1442966400000, to: 1458691200000 },
	{ title: 'Afgelopen 1 jaar', from: 1427068800000, to: 1458691200000 },
	{ title: 'Afgelopen 2 jaar', from: 1395532800000, to: 1458691200000 },
	{ title: 'Afgelopen 5 jaar', from: 1332460800000, to: 1458691200000 },
];

const translations = {
  'pagination.previous': 'Vorige',
  'pagination.next': 'Volgende',
  'reset.clear_all': 'Reset filters',
  'facets.view_more': 'Toon meer',
  'facets.view_less': 'Toon minder',
  'facets.view_all': 'Toon alles',
  'NoHits.NoResultsFound': "Geen resultaten gevonden voor '{query}'",
  'NoHits.DidYouMean': 'Bedoel je {suggestion}',
  'NoHits.SearchWithoutFilters': 'Zoek zonder filters',
  'NoHits.NoResultsFoundDidYouMean': "Geen resultaten gevonden voor '{query}'",
};

const ResetFiltersDisplay = (data) => {
  const { bemBlock, hasFilters, translate, resetFilters } = data;
  return (
    <div className={`sk-panel ${bemBlock().state({ disabled: !hasFilters })}`}>
      <Button theme="subtle" small onClick={resetFilters}>{translate('reset.clear_all')}</Button>
    </div>
  );
};

class Search extends Component {
  constructor(props, context) {
    super(props, context);
    this.context.searchkit.translateFunction = (key) => translations[key];
  }

  componentDidMount() {
    this.context.searchkit.resultsEmitter.listeners.push(results => {
      this.props.setHitCountAction(results.hits.total);
    });
  }

  render() {
    const { hits, toggleDrawerAction } = this.props;
    const toolsClass = (hits === null) ? 'sk-searchtools sk-searchtools--hide' : 'sk-searchtools';
    return (
      <Container size="large">
        <Helmet title="Search" />
        <Container>
          <div className={toolsClass}>
            <Button
              className="sk-drawer-action"
              theme="subtle"
              small
              onClick={toggleDrawerAction}
            >Filter</Button>
            <div className="sk-hits-stats">
              <div className="sk-hits-stats__info">{`${hits} resultaten`}</div>
            </div>
            <SortingSelector listComponent={Select} options={sortOption} />
          </div>
        </Container>

        <div className="sk-results">
          <Drawer>
            <ResetFilters component={ResetFiltersDisplay} />

            <RefinementListFilter
              id="soort"
              field="classification"
              operator="OR"
              title="Soort"
              size={5}
              containerComponent={<Panel collapsable defaultCollapsed={false} />}
            />
            <NumericRefinementListFilter
              id="dateFilter"
              title="Datum"
              field="date"
              containerComponent={<Panel collapsable defaultCollapsed={false} />}
              options={dateFilterOptions}
            />
          </Drawer>

          <div className="sk-main">
            <InitialLoader />
            <Hits
              hitsPerPage={8}
              highlightFields={['onderwerp', 'text']}
              itemComponent={SearchResultContainer}
              scrollTo="body"
            />
            <NoHits suggestionsField="onderwerp" />
            <Pagination showNumbers />
          </div>
        </div>
      </Container>
    );
  }
}

Search.contextTypes = {
  searchkit: PropTypes.object,
};

Search.propTypes = propTypes;

export default connect(
  (state) => ({
    hits: hitsSelector(state),
  }),
  (dispatch) => ({
    setHitCountAction: (count) => {
      dispatch(setHitCount(count));
    },
    toggleDrawerAction: () => {
      dispatch(toggleDrawer());
    },
  })
)(Search);
