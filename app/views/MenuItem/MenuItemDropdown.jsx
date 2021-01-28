import IconButton from '@material-ui/core/IconButton';
import * as schema from '@ontologies/schema';
import {
  Property,
  Resource,
  linkType,
  register,
} from 'link-redux';
import React from 'react';

import ResourceBoundary from '../../components/ResourceBoundary';
import ontola from '../../ontology/ontola';
import { cardFloatTopology } from '../../topologies/Card/CardFloat';
import { containerFloatTopology } from '../../topologies/Container/ContainerFloat';
import Menu from '../../topologies/Menu';

import { MenuTypes } from './types';

const MenuItemDropdown = ({
  menuItems,
}) => {
  const trigger = (onClick) => (
    <IconButton
      centerRipple
      color="default"
      size="small"
      onClick={onClick}
    >
      <Property label={schema.image} />
    </IconButton>
  );

  return (
    <ResourceBoundary>
      <Menu
        trigger={trigger}
      >
        <Resource subject={menuItems} />
      </Menu>
    </ResourceBoundary>
  );
};

MenuItemDropdown.type = MenuTypes;

MenuItemDropdown.topology = [cardFloatTopology, containerFloatTopology];

MenuItemDropdown.mapDataToProps = {
  menuItems: ontola.menuItems,
};

MenuItemDropdown.propTypes = {
  menuItems: linkType,
};

export default register(MenuItemDropdown);
