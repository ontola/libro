import rdf from '@ontologies/core';
import * as schema from '@ontologies/schema';
import {
  Property,
  linkType,
  register,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import FontAwesome from 'react-fontawesome';

import MenuItem from '../../components/MenuItem';
import { retrievePath } from '../../helpers/iris';
import { useIRITemplate } from '../../hooks/useIRITemplate';
import ontola from '../../ontology/ontola';
import { menuTopology } from '../../topologies/Menu';

const FilterOptionMenuComp = ({
  currentFilters,
  filterCount,
  filterKey,
  filterValue,
  handleClose,
  partOf,
  setCurrentPage,
}) => {
  const { iriAddParam, iriRemoveParam } = useIRITemplate(partOf);
  const selected = currentFilters.some((filter) => filter === filterValue);
  const param = `${encodeURIComponent(filterKey.value)}=${encodeURIComponent(filterValue.value)}`;
  const url = selected
    ? iriRemoveParam('filter%5B%5D', param)?.value
    : iriAddParam('filter%5B%5D', param)?.value;

  if (!url) {
    return null;
  }

  return (
    <MenuItem
      action={(e) => {
        e.preventDefault();
        handleClose();
        setCurrentPage(rdf.namedNode(url));
      }}
      expandOpen={null}
      url={url && retrievePath(url)}
    >
      <FontAwesome name={selected ? 'check-square-o' : 'square-o'} />
      {' '}
      <Property label={ontola.filterValue} />
      {filterCount && ` (${filterCount.value})`}
    </MenuItem>
  );
};

const FilterOptionMenu = React.forwardRef(
  (props, ref) => <FilterOptionMenuComp innerRef={ref} {...props} />
);

FilterOptionMenu.type = ontola.FilterOption;

FilterOptionMenu.topology = menuTopology;

FilterOptionMenu.mapDataToProps = {
  filterCount: ontola.filterCount,
  filterValue: ontola.filterValue,
  partOf: schema.isPartOf,
};

FilterOptionMenuComp.propTypes = {
  currentFilters: PropTypes.arrayOf(linkType),
  filterCount: linkType,
  filterKey: linkType,
  filterValue: linkType,
  handleClose: PropTypes.func,
  partOf: linkType,
  setCurrentPage: PropTypes.func,
};

export default register(FilterOptionMenu);
