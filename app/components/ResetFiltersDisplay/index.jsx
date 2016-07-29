import React, { PropTypes } from 'react';
import { Button } from '../';

const propTypes = {
  bemBlock: PropTypes.func,
  hasFilters: PropTypes.bool,
  translate: PropTypes.func,
  resetFilters: PropTypes.func,
};

function ResetFiltersDisplay({ bemBlock, hasFilters, translate, resetFilters }) {
  return (
    <div className={`sk-panel ${bemBlock().state({ disabled: !hasFilters })}`}>
      <Button theme="subtle" small onClick={resetFilters}>{translate('reset.clear_all')}</Button>
    </div>
	);
}

ResetFiltersDisplay.propTypes = propTypes;

export default ResetFiltersDisplay;
