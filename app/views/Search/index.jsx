// @flow
import './search.scss';
import React from 'react';
import Helmet from 'react-helmet';
import {
	Box, Button, Heading,
	ResetFiltersDisplay, EntryListItem, EmptyState
} from '../../components';

import {
	SearchBox, HitsStats, RefinementListFilter,
  Pagination, ResetFilters, MenuFilter, SelectedFilters, HierarchicalMenuFilter,
  NumericRefinementListFilter, GroupedSelectedFilters, SortingSelector,
	SearchkitProvider, SearchkitManager, NoHits, Panel, InputFilter,
	Toggle, Select, Tabs, ItemList, RangeFilter, InitialLoader, ViewSwitcherToggle, ViewSwitcherHits
} from 'searchkit';

const sk = new SearchkitManager('/aod_search', {
	// searchOnLoad: false
});

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
	"hitstats.results_found": "{hitCount} resultaten" // gevonden in {timeTaken} milliseconde
};

class Search extends React.Component {
	constructor(props) {
    super(props);

    this.state = {
      visible: false
    };

		this.toggleDrawer = this.toggleDrawer.bind(this);

		sk.resultsEmitter.listeners.push (results => {
			this.setHitCount(results.hits.total);
		});

		sk.translateFunction = (key) => {
		  return translations[key]
		}
  }

	setHitCount(hits) {
		this.setState({ hits: hits });
	}

	toggleDrawer() {
		this.setState({ visible: !this.state.visible });
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
		return (
			<div>
				<Helmet title="Zoeken" />
				<SearchkitProvider searchkit={sk}>
					<div className="sk-container">
						<div className="sk-searchbar">
							<SearchBox autofocus={true} searchOnChange={true} searchThrottleTime={1000} queryBuilder={this.queryBuilder} queryFields={["onderwerp", "text", "text.shingles"]}	/>
						</div>

						<div className="sk-searchtools">
							<div className="sk-display-tools">
								<div className="sk-drawer-action">
									<span className="sk-drawer-action__btn" onClick={this.toggleDrawer}>Filter</span>
								</div>
								<SortingSelector listComponent={Select} options={sortOption} />
							</div>
							<HitsStats/>
						</div>

						<div className="sk-results">
							<div className={(this.state.visible ? "sk-sidebar--visible " : "") + "sk-sidebar"}>
								<div className="sk-sidebar__overlay" onClick={this.toggleDrawer}></div>
								<div className="sk-sidebar__wrapper">
									<div className="sk-sidebar__container">
										<ResetFilters component={ResetFiltersDisplay} />
										<RefinementListFilter id="soort" field="classification" operator="OR" title="Soort" size={5} containerComponent={<Panel collapsable={true} defaultCollapsed={false}/>}/>
										<RefinementListFilter id="Vergaderjaar" field="legislative_session" orderKey="_term" orderDirection="desc" operator="AND" title="Vergaderjaar" size={5} containerComponent={<Panel collapsable={true} defaultCollapsed={false}/>}/>
										<NumericRefinementListFilter id="dateFilter" title="Datum" field="date" containerComponent={<Panel collapsable={true} defaultCollapsed={false}/>} options={dateFilterOptions}/>
									</div>
									<div className="sk-drawer-action sk-drawer-action--close">
										<span className="sk-drawer-action__btn sk-drawer-action__btn--primary" onClick={this.toggleDrawer}>Toon { this.state.hits } resultaten</span>
									</div>
								</div>
							</div>

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
