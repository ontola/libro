import Tab from '@material-ui/core/Tab';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  Resource,
  register,
} from 'link-redux';
import React from 'react';

import { tabBarTopology } from '../../topologies/TabBar';

import { MenuTypes } from './types';

interface MenuItemTabProps {
  onClick: React.EventHandler<any>;
}

const MenuItemTab: FC<MenuItemTabProps> = ({
  subject,
  onClick,
}) => (
  <Tab
    icon={(
      <Resource subject={subject}>
        <Property label={schema.image} />
      </Resource>
    )}
    key={subject.value}
    label={(
      <Resource subject={subject}>
        <Property label={schema.name} />
      </Resource>
    )}
    value={subject.value}
    onChange={onClick}
  />
);

MenuItemTab.type = MenuTypes;

MenuItemTab.topology = tabBarTopology;

MenuItemTab.mapDataToProps = {
  name: schema.name,
};

export default register(MenuItemTab);
