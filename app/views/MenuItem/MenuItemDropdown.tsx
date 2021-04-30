import IconButton from '@material-ui/core/IconButton';
import { NamedNode } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  Resource,
  register,
} from 'link-redux';
import React from 'react';

import ResourceBoundary from '../../components/ResourceBoundary';
import ontola from '../../ontology/ontola';
import { cardFloatTopology } from '../../topologies/Card/CardFloat';
import { containerFloatTopology } from '../../topologies/Container/ContainerFloat';
import Menu from '../../topologies/Menu';

import { MenuTypes } from './types';

interface MenuItemDropdownProps {
  menuItems: NamedNode;
}

const trigger = (onClick: () => void) => (
  <IconButton
    centerRipple
    color="default"
    size="small"
    onClick={onClick}
  >
    <Property label={schema.image} />
  </IconButton>
);

const MenuItemDropdown: FC<MenuItemDropdownProps> = ({
  menuItems,
}) => (
  <ResourceBoundary>
    <Menu
      trigger={trigger}
    >
      <Resource subject={menuItems} />
    </Menu>
  </ResourceBoundary>
);

MenuItemDropdown.type = MenuTypes;

MenuItemDropdown.topology = [cardFloatTopology, containerFloatTopology];

MenuItemDropdown.mapDataToProps = {
  menuItems: ontola.menuItems,
};

export default register(MenuItemDropdown);
