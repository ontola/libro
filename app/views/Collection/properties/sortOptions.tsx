import IconButton from '@material-ui/core/IconButton';
import rdf, { NamedNode, SomeTerm } from '@ontologies/core';
import {
  FC,
  Resource,
  register,
} from 'link-redux';
import React, { MouseEventHandler } from 'react';
import FontAwesome from 'react-fontawesome';

import { retrievePath } from '../../../helpers/iris';
import MenuItem from '../../../components/MenuItem';
import { useSorting } from '../../../hooks/useSorting';
import ontola from '../../../ontology/ontola';
import { allTopologies } from '../../../topologies';
import Menu from '../../../topologies/Menu';
import { CollectionTypes } from '../types';

export interface SortOptionsProps {
  linkedProp: SomeTerm;
  setCurrentPage: (page: NamedNode) => void;
}
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

const SortOptions: FC<SortOptionsProps> = ({ setCurrentPage }) => {
  const sortOptions = useSorting();

  const menuItems = ({ handleClose }: MenuItemsProps) => sortOptions
    .filter((option) => option.direction && option.url)
    .map(({
      item,
      url,
      direction,
      selected,
    }) => (
      <MenuItem
        action={(e) => {
          e.preventDefault();
          handleClose();
          setCurrentPage(rdf.namedNode(url));
        }}
        expandOpen={null}
        key={url}
        url={retrievePath(url!)!}
      >
        <FontAwesome name={selected ? 'circle' : 'circle-o'} />
        {' '}
        <FontAwesome
          name={`sort-amount-${direction}`}
        />
        {' '}
        <Resource subject={item} />
      </MenuItem>
    ));

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
