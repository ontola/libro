import rdf, { NamedNode, SomeTerm } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import { SomeNode } from 'link-lib';
import {
  FC,
  Property,
  register,
} from 'link-redux';
import React, { MouseEvent } from 'react';
import FontAwesome from 'react-fontawesome';

import MenuItem from '../../components/MenuItem';
import { retrievePath } from '../../helpers/iris';
import { useIRITemplate } from '../../hooks/useIRITemplate';
import ontola from '../../ontology/ontola';
import { menuTopology } from '../../topologies/Menu';

interface FilterOptionMenuCompProps {
  currentFilters: SomeNode[];
  filterCount: SomeTerm;
  filterKey: SomeNode;
  filterValue: SomeTerm;
  handleClose: () => void;
  partOf: SomeNode;
  setCurrentPage: (page: NamedNode) => void;
}

interface FilterOptionMenuCompPropsWithRef extends FilterOptionMenuCompProps {
  innerRef: any;
}

const FilterOptionMenuComp: React.FC<FilterOptionMenuCompPropsWithRef> = ({
  currentFilters,
  filterCount,
  filterKey,
  filterValue,
  handleClose,
  partOf,
  setCurrentPage,
}) => {
  const iriTemplate = useIRITemplate(partOf);
  const selected = currentFilters.some((filter) => filter === filterValue);
  const param = `${encodeURIComponent(filterKey.value)}=${encodeURIComponent(filterValue.value)}`;
  const url = selected
    ? iriTemplate.remove('filter%5B%5D', param)?.value
    : iriTemplate.add('filter%5B%5D', param)?.value;

  if (!url) {
    return null;
  }

  return (
    <MenuItem
      action={(e: MouseEvent<any>) => {
        e.preventDefault();
        handleClose();
        setCurrentPage(rdf.namedNode(url));
      }}
      expandOpen={null}
      url={retrievePath(url)}
    >
      <FontAwesome name={selected ? 'check-square-o' : 'square-o'} />
      {' '}
      <Property label={ontola.filterValue} />
      {filterCount && ` (${filterCount.value})`}
    </MenuItem>
  );
};

const FilterOptionMenu = React.forwardRef<FC, FilterOptionMenuCompProps>(
  (props, ref) => <FilterOptionMenuComp innerRef={ref} {...props} />,
) as unknown as FC;

FilterOptionMenu.type = ontola.FilterOption;

FilterOptionMenu.topology = menuTopology;

FilterOptionMenu.mapDataToProps = {
  filterCount: ontola.filterCount,
  filterValue: ontola.filterValue,
  partOf: schema.isPartOf,
};

export default register(FilterOptionMenu);
