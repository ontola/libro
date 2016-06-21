import React, { PropTypes } from 'react';
import { Button } from '../';

function ResetFiltersDisplay({ bemBlock, hasFilters, translate, resetFilters }) {
	return (
		<div className={ 'sk-panel ' + bemBlock().state({disabled:!hasFilters}) }>
			<Button theme="subtle" onClick={resetFilters}>{translate("reset.clear_all")}</Button>
		</div>
	);
}
export default ResetFiltersDisplay;
