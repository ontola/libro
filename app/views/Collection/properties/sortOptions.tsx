import IconButton from '@material-ui/core/IconButton';
import rdf, { SomeTerm } from '@ontologies/core';
import {
  FC,
  Resource,
  register,
} from 'link-redux';
import React, { MouseEventHandler } from 'react';
import FontAwesome from 'react-fontawesome';

import { useCollectionOptions } from '../../../components/Collection/CollectionProvider';
import { retrievePath } from '../../../helpers/iris';
import MenuItem from '../../../components/MenuItem';
import { SortProps, useSorting } from '../../../hooks/useSorting';
import ontola from '../../../ontology/ontola';
import { allTopologies } from '../../../topologies';
import Menu from '../../../topologies/Menu';
import { CollectionTypes } from '../types';

export interface SortOptionsProps {
  linkedProp: SomeTerm;
}

type SortOptionProps = SortProps & MenuItemsProps;

interface MenuItemsProps {
  handleClose: () => void;
}

const trigger = (onClick: MouseEventHandler) => (
  <IconButton
    centerRipple
    color="default"
    size="small"
    onClick={onClick}
  >
    <FontAwesome name="sort" />
  </IconButton>
);

const SortOption = ({
  handleClose,
  item,
  url,
  direction,
  selected,
}: SortOptionProps) => {
  const { setCollectionResource } = useCollectionOptions();
  const action = React.useCallback((e) => {
    e.preventDefault();
    handleClose();
    setCollectionResource(rdf.namedNode(url));
  }, [handleClose, setCollectionResource, url]);

  return (
    <MenuItem
      action={action}
      expandOpen={null}
      url={retrievePath(url!)!}
    >
      <FontAwesome name={selected ? 'circle' : 'circle-o'} />
      {' '}
      <FontAwesome name={`sort-amount-${direction}`} />
      {' '}
      <Resource subject={item} />
    </MenuItem>
  );
};

const SortOptions: FC<SortOptionsProps> = () => {
  const { currentCollection } = useCollectionOptions();
  const sortOptions = useSorting(currentCollection);

  const menuItems = React.useCallback(({ handleClose }: MenuItemsProps) => (
    sortOptions
      .filter((option) => option.direction && option.url)
      .map((option) => (
        <SortOption
          {...option}
          handleClose={handleClose}
          key={option.url}
        />
      ))
  ), [sortOptions]);

  return (
    <Menu
      trigger={trigger}
    >
      {menuItems}
    </Menu>
  );
};

SortOptions.type = CollectionTypes;

SortOptions.topology = allTopologies;

SortOptions.property = ontola.sortOptions;

export default register(SortOptions);
