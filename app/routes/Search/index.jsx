import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import {
  Hits,
  InitialLoader,
  NoHits,
  Pagination,
  RangeFilter,
  RangeSliderHistogram,
  RefinementListFilter,
  ResetFilters,
  SearchBox,
  Select,
  SortingSelector,
} from 'searchkit';

import {
  Button,
  Container,
  Cover,
  Heading,
} from 'components';
import DrawerContainer from 'containers/DrawerContainer';
import SearchResultContainer from 'containers/SearchResultContainer';
import { getSearchHits } from 'state/searchElastic/selectors';
import { setHitCount, toggleDrawer } from 'state/searchElastic/actions';
import { formatDate } from 'helpers/date';
import paths from 'helpers/paths';

import './Search.scss';

const propTypes = {
  hits: PropTypes.number,
  setHitCountAction: PropTypes.func,
  toggleDrawerAction: PropTypes.func,
};

const sortOption = [
  {
    field: 'date',
    label: 'Nieuw-Oud',
    order: 'desc',
  },
  {
    field: 'date',
    label: 'Oud-Nieuw',
    order: 'asc',
  },
  {
    defaultOption: true,
    field: '_score',
    label: 'Relevantie',
    order: 'desc',
  },
];

const translations = {
  'NoHits.DidYouMean': 'Bedoelde je {suggestion}?',
  'NoHits.NoResultsFound': 'Geen resultaten gevonden voor {query}',
  'NoHits.NoResultsFoundDidYouMean': "Geen resultaten gevonden voor '{query}'",
  'NoHits.SearchWithoutFilters': 'Zoek naar {query} zonder filters',
  'facets.view_all': 'Toon alles',
  'facets.view_less': 'Toon minder',
  'facets.view_more': 'Toon meer',
  'pagination.next': 'Volgende',
  'pagination.previous': 'Vorige',
  'reset.clear_all': 'Reset zoekopdracht',
};

const ResetFiltersDisplay = (data) => {
  const {
    bemBlock, hasFilters, translate, resetFilters
  } = data;
  return (
    <div className={`sk-panel ${bemBlock().state({ disabled: !hasFilters })}`}>
      <Button small theme="subtle" onClick={resetFilters}>{translate('reset.clear_all')}</Button>
    </div>
  );
};

const InitialLoadingComponent = () => (
  <Heading size="3">Zoekmachine wordt geladen...</Heading>
);

class Search extends Component {
  constructor(props, context) {
    super(props, context);
    this.context.searchkit.translateFunction = key => translations[key];
  }

  componentDidMount() {
    const {
      searchkit,
    } = this.context;

    searchkit.reloadSearch();

    searchkit.resultsEmitter.listeners.push((results) => {
      this.props.setHitCountAction(results.hits.total);
    });
  }

  render() {
    const { hits, toggleDrawerAction } = this.props;
    const toolsClass = hits === null && 'Search__search-tools--hide';

    return (
      <div>
        <Helmet title="Moties zoeken" />
        <Cover>
          <Container size="large">
            <Heading>Moties zoeken</Heading>
            <SearchBox
              autofocus
              searchOnChange
              placeholder="Zoek in 10.000 moties op onderwerp, bijv. 'zorg'"
              queryFields={['name', 'text', 'text.shingles']}
            />
            <div className={`Search__search-tools ${toolsClass}`}>
              <div className="Search__drawer-action">
                <Button
                  small
                  theme="subtle"
                  onClick={toggleDrawerAction}
                >Filter
                </Button>
              </div>
              <div className="Search__hits">{`${hits} resultaten`}</div>
              <SortingSelector listComponent={Select} options={sortOption} />
            </div>
          </Container>
        </Cover>
        <Container size="large">
          <div className="Search__results">
            <DrawerContainer>
              <RefinementListFilter
                field="submitters"
                id="indiener"
                operator="OR"
                size={5}
                title="Indiener"
              />
              <RangeFilter
                showHistogram
                field="date"
                id="dateRangeFilter"
                max={Date.now()}
                min={1332460800000}
                rangeComponent={RangeSliderHistogram}
                rangeFormatter={count => formatDate(count, 'l')}
                title="Datum"
              />
              <ResetFilters component={ResetFiltersDisplay} />
              <Button small icon="info" theme="transparent">
                <Link to={paths.info('Search')}>Bekijk zoektips</Link>
              </Button>
            </DrawerContainer>
            <div className="Search__main">
              <Hits
                highlightFields={['name', 'text']}
                hitsPerPage={25}
                itemComponent={SearchResultContainer}
                scrollTo="body"
              />
              <InitialLoader component={InitialLoadingComponent} />
              <NoHits
                suggestionsField="name"
                translations={{
                  'NoHits.DidYouMean': 'Bedoelde je {suggestion}?',
                  'NoHits.NoResultsFound': 'Geen resultaten gevonden voor {query}',
                  'NoHits.SearchWithoutFilters': 'Zoek naar {query} zonder filters',
                }}
              />
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
  state => ({
    hits: getSearchHits(state),
  }),
  dispatch => ({
    setHitCountAction: (count) => { dispatch(setHitCount(count)); },
    toggleDrawerAction: () => { dispatch(toggleDrawer()); },
  })
)(Search);
