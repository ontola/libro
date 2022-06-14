import { isNode } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import {
  FC,
  PropertyProps,
  Resource,
  array,
  register,
  useIds,
  useStrings,
} from 'link-redux';
import React from 'react';

import HeaderButton from '../../../components/Button/HeaderButton';
import { Trigger } from '../../../components/DropdownMenu/TriggerButton';
import { normalizeFontAwesomeIRI } from '../../../helpers/iris';
import ontola from '../../../ontology/ontola';
import { cardFloatTopology, containerFloatTopology } from '../../../topologies';
import Menu from '../../../topologies/Menu';

const trigger: Trigger = (props) => {
  const [image] = useIds(schema.image);
  const icon = (image ? normalizeFontAwesomeIRI(image) : undefined);

  return (
    <HeaderButton
      {...props}
      icon={icon}
    />
  );
};

const FollowMenu: FC<PropertyProps> = ({
  linkedProp,
}) => {
  const menu = isNode(linkedProp) ? linkedProp : undefined;
  const items = useIds(menu, array(ontola.menuItems));
  const [name] = useStrings(menu, schema.name);

  return (
    <Resource subject={menu}>
      <Menu
        title={name}
        trigger={trigger}
      >
        {items.map((item) => (
          <Resource
            key={item.value}
            subject={item}
          />
        ))}
      </Menu>
    </Resource>
  );
};

FollowMenu.type = schema.Thing;

FollowMenu.property = ontola.followMenu;

FollowMenu.topology = [containerFloatTopology, cardFloatTopology];

export default register(FollowMenu);
