import IconButton from '@material-ui/core/IconButton';
import {
  Resource,
  register,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import FontAwesome from 'react-fontawesome';

import { retrievePath } from '../../../helpers/iris';
import MenuItem from '../../../components/MenuItem';
import { useSorting } from '../../../hooks/useSorting';
import ontola from '../../../ontology/ontola';
import { allTopologies } from '../../../topologies';
import Menu from '../../../topologies/Menu';
import { CollectionTypes } from '../types';

const SortOptions = ({
  onPageChange,
}) => {
  const sortOptions = useSorting();

  const trigger = (onClick) => (
    <IconButton
      centerRipple
      color="default"
      size="small"
      onClick={onClick}
    >
      <FontAwesome name="sort" />
    </IconButton>
  );

  const menuItems = ({ handleClose }) => sortOptions
    .filter((option) => option.direction)
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
          onPageChange(url);
        }}
        expandOpen={null}
        key={url}
        url={retrievePath(url)}
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

SortOptions.propTypes = {
  onPageChange: PropTypes.func,
};

export default register(SortOptions);
