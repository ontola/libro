import * as schema from '@ontologies/schema';
import {
  Property,
  Resource,
  array,
  register,
  useIds,
  useProperty,
} from 'link-redux';
import React from 'react';

import TriggerButton, { Trigger } from '../../components/DropdownMenu/TriggerButton';
import ResourceBoundary from '../../components/ResourceBoundary';
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
  const items = useIds(array(ontola.menuItems));
  const [name] = useProperty(schema.name);

  return(
    <ResourceBoundary>
      <Menu
        title={name.value}
        trigger={trigger}
      >
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
