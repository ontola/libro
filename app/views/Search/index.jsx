// @flow
import './search.scss';
import React from 'react';
import Helmet from 'react-helmet';

import {
	Box, Button, Heading, Drawer,
	ResetFiltersDisplay, EntryListItem, EmptyState
} from '../../components';

import {
	SearchBox, RefinementListFilter,
  Pagination, ResetFilters, MenuFilter, SelectedFilters, HierarchicalMenuFilter,
  NumericRefinementListFilter, GroupedSelectedFilters, SortingSelector,
	SearchkitProvider, SearchkitManager, NoHits, Panel, InputFilter,
	Toggle, Select, ItemList, RangeFilter, InitialLoader, ViewSwitcherToggle, ViewSwitcherHits
} from 'searchkit';

const sk = new SearchkitManager('/aod_search');

const sortOption = [
	{label:"Relevantie", field:"_score", order:"desc", defaultOption:true},
	{label:"Nieuw-Oud", field:"date", order:"desc"},
	{label:"Oud-Nieuw", field:"date", order:"asc"}
];

const viewComponents = [
	{key:"list", title:"Lijst", itemComponent: EntryListItem, defaultOption:true},
];

const dateFilterOptions = [
	{title:"Afgelopen 6 maanden", from:1442966400000, to:1458691200000},
	{title:"Afgelopen 1 jaar", from:1427068800000, to:1458691200000},
	{title:"Afgelopen 2 jaar", from:1395532800000, to:1458691200000},
	{title:"Afgelopen 5 jaar", from:1332460800000, to:1458691200000}
];

const translations = {
	"pagination.previous": "Vorige",
	"pagination.next": "Volgende",
	"reset.clear_all": "Reset filters",
	"facets.view_more": "Toon meer",
	"facets.view_less": "Toon minder",
	"facets.view_all": "Toon alles",
	"NoHits.NoResultsFound": "Geen resultaten gevonden voor '{query}'",
	"NoHits.DidYouMean": "Bedoel je {suggestion}",
	"NoHits.SearchWithoutFilters": "Zoek zonder filters",
	"NoHits.NoResultsFoundDidYouMean": "Geen resultaten gevonden voor '{query}'",
	"searchbox.placeholder": "Zoeken",
};

class Search extends React.Component {
	constructor(props) {
    super(props);

		sk.translateFunction = (key) => {
		  return translations[key]
		}
  }

	componentDidMount() {
		console.log(this.props);

		sk.resultsEmitter.listeners.push (results => {
			this.props.setHitCount(results.hits.total);
		});
	}

	queryBuilder(queryString) {
		return ({
			"bool": {
				"must": {
					"simple_query_string": {
						"query": queryString,
						"fields": ["text"],
						"minimum_should_match": "80%"
					}
				},
				"should": {
					"simple_query_string": {
						"query": queryString,
						"fields": ["text.shingles"],
						"minimum_should_match": "80%"
					}
				}
			}
		})
	}

	render() {
		const { hits, toggleDrawer } = this.props;

		return (
			<div>
				<Helmet title="Zoeken" />
				<SearchkitProvider searchkit={sk}>
					<div>
						<Box ghost>
							<SearchBox autofocus={true} searchOnChange={true} searchThrottleTime={1000} queryBuilder={this.queryBuilder} queryFields={["onderwerp", "text", "text.shingles"]}	/>

							<div className="sk-searchtools">

								<div className="sk-display-tools">
									<Button className="sk-drawer-action" theme="subtle" weight onClick={toggleDrawer}>Filter</Button>
									<SortingSelector listComponent={Select} options={sortOption} />
								</div>

								<div class="sk-hits-stats">
									<div class="sk-hits-stats__info">
										{hits} resultaten
									</div>
								</div>

							</div>

						</Box>


						<div className="sk-results">
							<Drawer>
								<ResetFilters component={ResetFiltersDisplay} />
								<RefinementListFilter id="soort" field="classification" operator="OR" title="Soort" size={5} containerComponent={<Panel collapsable={true} defaultCollapsed={false}/>}/>
								<RefinementListFilter id="Vergaderjaar" field="legislative_session" orderKey="_term" orderDirection="desc" operator="AND" title="Vergaderjaar" size={5} containerComponent={<Panel collapsable={true} defaultCollapsed={false}/>}/>
								<NumericRefinementListFilter id="dateFilter" title="Datum" field="date" containerComponent={<Panel collapsable={true} defaultCollapsed={false}/>} options={dateFilterOptions}/>
							</Drawer>

							<div className="sk-main">
								<InitialLoader />
								<ViewSwitcherHits hitsPerPage={8} highlightFields={["onderwerp","text"]} hitComponents={viewComponents} scrollTo="body" />
								<NoHits suggestionsField="onderwerp"/>
								<Pagination showNumbers={true}/>
							</div>
						</div>
					</div>
				</SearchkitProvider>
			</div>
		);
	}
}

export default Search;
