import React, { PropTypes } from 'react';

function ResetFiltersDisplay({ bemBlock, hasFilters, translate, resetFilters }) {
	return (
		<div className={ 'sk-panel ' + bemBlock().state({disabled:!hasFilters}) }>
			<div onClick={resetFilters} className="sk-drawer-action__btn sk-drawer-action__btn--ghost">
					<div>{translate("reset.clear_all")}</div>
			</div>
		</div>
	);
}

export default ResetFiltersDisplay;
