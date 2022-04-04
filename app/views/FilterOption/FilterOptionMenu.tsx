import rdf, { SomeTerm } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import { SomeNode } from 'link-lib';
import {
  FC,
  Property,
  register,
  useIds,
  useProperty,
} from 'link-redux';
import React, { MouseEvent } from 'react';
import FontAwesome from 'react-fontawesome';

import { useCollectionOptions } from '../../components/Collection/CollectionProvider';
import MenuItem from '../../components/MenuItem';
import { retrievePath } from '../../helpers/iris';
import { useIRITemplate } from '../../hooks/useIRITemplate';
import ontola from '../../ontology/ontola';
import { menuTopology } from '../../topologies';

interface FilterOptionMenuCompProps {
  activeFilters: SomeNode[];
  filterCount: SomeTerm;
  filterKey: SomeNode;
  filterValue: SomeTerm;
  handleClose: () => void;
  partOf: SomeNode;
}

interface FilterOptionMenuCompPropsWithRef extends FilterOptionMenuCompProps {
  innerRef: unknown;
}

const FilterOptionMenuComp: React.FC<FilterOptionMenuCompPropsWithRef> = ({
  activeFilters,
  filterCount,
  filterKey,
  filterValue,
  handleClose,
  partOf,
}) => {
  const iriTemplate = useIRITemplate(partOf);
  const { setCollectionResource } = useCollectionOptions();
  const selected = activeFilters.some((filter) => filter === filterValue);
  const param = `${encodeURIComponent(filterKey.value)}=${encodeURIComponent(filterValue.value)}`;
  const url = selected
    ? iriTemplate.remove('filter%5B%5D', param)?.value
    : iriTemplate.add('filter%5B%5D', param)?.value;

  if (!url) {
    return null;
  }

  return (
    <MenuItem
      action={(e: MouseEvent) => {
        e.preventDefault();
        handleClose();
        setCollectionResource(rdf.namedNode(url));
      }}
      expandOpen={null}
      url={retrievePath(url) ?? '#'}
    >
      <FontAwesome name={selected ? 'check-square-o' : 'square-o'} />
      {' '}
      <Property label={ontola.filterValue} />
      {filterCount && ` (${filterCount.value})`}
    </MenuItem>
  );
};

const FilterOptionMenu = React.forwardRef<FC, FilterOptionMenuCompProps>(
  (props, ref) => {
    const [filterCount] = useProperty(ontola.filterCount);
    const [filterValue] = useProperty(ontola.filterValue);
    const [partOf] = useIds(schema.isPartOf);

    return(
      <FilterOptionMenuComp
        innerRef={ref}
        {...props}
        filterCount={filterCount}
        filterValue={filterValue}
        partOf={partOf}
      />
    );
  },
) as unknown as FC;

FilterOptionMenu.type = ontola.FilterOption;

FilterOptionMenu.topology = menuTopology;

export default register(FilterOptionMenu);
