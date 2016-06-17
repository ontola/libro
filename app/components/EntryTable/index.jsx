import React, { PropTypes } from 'react';

function EntryHitsTable({ hits }) {
	return (
		<div>
			<table className="sk-table sk-table-striped" style={{width: '100%', boxSizing: 'border-box'}}>
				<thead>
					<tr>
						<th>Titel</th>
						<th>Datum</th>
					</tr>
				</thead>
				<tbody>
				{hits.map(hit => (
					<tr key={hit._id}>
						<td>{hit._source.onderwerp}</td>
						<td>{hit._source.date}</td>
					</tr>
				))}
				</tbody>
			</table>
		</div>
	)
}

export default EntryHitsTable;
