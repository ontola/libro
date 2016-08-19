// @flow
import './Search.scss';
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import {
	Hits, NoHits, NumericRefinementListFilter, Pagination,
	RefinementListFilter, RangeFilter, RangeSliderHistogram,
  ResetFilters, Select, SortingSelector,
} from 'searchkit';

import { Button, Container, Cover } from 'components';
import DrawerContainer from 'containers/DrawerContainer';
import SearchResultContainer from 'containers/SearchResultContainer';
import { getSearchHits } from 'state/search/selectors';
import { toggleDrawer, setHitCount } from 'state/search/actions';
import { formatDate } from 'helpers/date';

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
  'reset.clear_all': 'Reset zoekopdracht',
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
      <div>
        <Helmet title="Search" />
        <Cover type="lighter">
          <Container size="large">
            <div className={toolsClass}>
              <div className="sk-drawer-action">
                <Button
                  theme="subtle"
                  small
                  onClick={toggleDrawerAction}
                >Filter</Button>
              </div>
              <div className="sk-hits-stats">
                <div className="sk-hits-stats__info">{`${hits} resultaten`}</div>
              </div>
              <SortingSelector listComponent={Select} options={sortOption} />
            </div>
          </Container>
        </Cover>
        <Container size="large">
          <div className="sk-results">
            <DrawerContainer>
              <ResetFilters component={ResetFiltersDisplay} />
              <RefinementListFilter
                id="soort"
                field="classification"
                operator="OR"
                title="Soort"
                size={5}
              />
              <NumericRefinementListFilter
                id="dateFilter"
                title="Datum"
                field="date"
                options={dateFilterOptions}
              />
              <RangeFilter
                field="date"
                title="Datum"
                id="dateRangeFilter"
                min={1332460800000}
                max={1458691200000}
                showHistogram
                rangeComponent={RangeSliderHistogram}
                rangeFormatter={count => formatDate(count)}
              />
            </DrawerContainer>

            <div className="sk-main">
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
      </div>
    );
  }
}

Search.contextTypes = {
  searchkit: PropTypes.object,
};

Search.propTypes = propTypes;

export default connect(
  (state) => ({
    hits: getSearchHits(state),
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
