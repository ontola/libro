import * as schema from '@ontologies/schema';
import {
  Property,
  Resource,
  register,
  useIds,
} from 'link-redux';
import React from 'react';

import TriggerButton, { Trigger } from '../../components/DropdownMenu/TriggerButton';
import ResourceBoundary from '../../components/ResourceBoundary';
import { useSeqToArr } from '../../hooks/useSeqToArr';
import ontola from '../../ontology/ontola';
import { cardFloatTopology } from '../../topologies/Card/CardFloat';
import { containerFloatTopology } from '../../topologies/Container/ContainerFloat';
import Menu from '../../topologies/Menu';

import { MenuTypes } from './types';

const trigger: Trigger = (props) => (
  <TriggerButton {...props}>
    <Property label={schema.image} />
  </TriggerButton>
);

const MenuItemDropdown = () => {
  const [menuItems] = useIds(ontola.menuItems);
  const [items] = useSeqToArr(menuItems);

  return(
    <ResourceBoundary>
      <Menu trigger={trigger}>
        {items.map((item) => (
          <Resource
            key={item.value}
            subject={item}
          />
        ))}
      </Menu>
    </ResourceBoundary>
  );
};

MenuItemDropdown.type = MenuTypes;

MenuItemDropdown.topology = [cardFloatTopology, containerFloatTopology];

export default register(MenuItemDropdown);
