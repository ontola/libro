// @flow
import './search.scss';
import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';

import {
	Box, Button, Heading, Drawer,
	ResetFiltersDisplay, EntryListItem, EmptyState
} from '../../components';

import {
	SearchBox, RefinementListFilter, Pagination, ResetFilters,
  NumericRefinementListFilter, SortingSelector, NoHits, Panel,
	Select, InitialLoader, Hits,
} from 'searchkit';

const sortOption = [
	{label:"Relevantie", field:"_score", order:"desc", defaultOption:true},
	{label:"Nieuw-Oud", field:"date", order:"desc"},
	{label:"Oud-Nieuw", field:"date", order:"asc"}
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
};

class Search extends React.Component {
	constructor(props, context) {
    super(props, context);

		this.context.searchkit.translateFunction = (key) => {
		  return translations[key]
		}
  }

	componentDidMount() {
		this.context.searchkit.resultsEmitter.listeners.push (results => {
			this.props.setHitCount(results.hits.total);
		});
	}

	render() {
		const { hits, toggleDrawer } = this.props;

		return (
			<div>
				<Helmet title="Zoeken" />
				<Box ghost>
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
						<Hits hitsPerPage={8} highlightFields={["onderwerp","text"]} itemComponent={EntryListItem} scrollTo="body" />
						<NoHits suggestionsField="onderwerp"/>
						<Pagination showNumbers={true}/>
					</div>
				</div>
			</div>
		);
	}
}

Search.contextTypes = {
  searchkit: PropTypes.object,
};

export default Search;
