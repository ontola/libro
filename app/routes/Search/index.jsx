import './Search.scss';
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Link } from 'react-router';

import {
  Hits,
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
} from 'components';
import DrawerContainer from 'containers/DrawerContainer';
import SearchResultContainer from 'containers/SearchResultContainer';
import { getSearchHits } from 'state/searchElastic/selectors';
import { toggleDrawer, setHitCount } from 'state/searchElastic/actions';
import { formatDate } from 'helpers/date';
import paths from 'helpers/paths';

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
        <Helmet title="Zoeken" />
        <Cover>
          <Container size="large">
            <SearchBox
              autofocus
              queryFields={['name', 'text', 'text.shingles']}
              placeholder="Zoek op onderwerp, persoon, organisatie..."
              searchOnChange
            />
            <div className={`Search__search-tools ${toolsClass}`}>
              <div className="Search__drawer-action">
                <Button
                  theme="subtle"
                  small
                  onClick={toggleDrawerAction}
                >Filter</Button>
              </div>
              <div className="Search__hits">{`${hits} resultaten`}</div>
              <Link to={paths.info('Search')}>Bekijk zoektips</Link>
              <SortingSelector listComponent={Select} options={sortOption} />
            </div>
          </Container>
        </Cover>
        <Container size="large">
          <div className="Search__results">
            <DrawerContainer>
              <RefinementListFilter
                id="soort"
                field="_type"
                operator="OR"
                title="Soort"
                size={5}
              />
              <RefinementListFilter
                id="onderwerp"
                field="categories"
                operator="OR"
                title="Onderwerp"
                size={5}
              />
              <RefinementListFilter
                id="indiener"
                field="submitters"
                operator="OR"
                title="Indiener"
                size={5}
              />
              <RangeFilter
                field="date"
                title="Datum"
                id="dateRangeFilter"
                min={1332460800000}
                max={Date.now()}
                showHistogram
                rangeComponent={RangeSliderHistogram}
                rangeFormatter={count => formatDate(count, 'l')}
              />
              <ResetFilters component={ResetFiltersDisplay} />
            </DrawerContainer>
            <div className="Search__main">
              <Hits
                hitsPerPage={8}
                highlightFields={['name', 'text']}
                itemComponent={SearchResultContainer}
                scrollTo="body"
              />
              <NoHits
                suggestionsField="name"
                translations={{
                  'NoHits.NoResultsFound': 'Geen resultaten gevonden voor {query}',
                  'NoHits.DidYouMean': 'Bedoelde je {suggestion}?',
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
