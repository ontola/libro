import Tab from '@material-ui/core/Tab';
import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
  useLRS,
  useProperty,
} from 'link-redux';
import React from 'react';

import { isDifferentWebsite } from '../../helpers/iris';
import ontola from '../../ontology/ontola';
import { tabBarTopology } from '../../topologies/TabBar';

import { MenuTypes } from './types';

interface MenuItemTabProps {
  onClick: React.EventHandler<any>;
}

const MenuItemTab: FC<MenuItemTabProps> = ({
  subject,
  onClick,
}) => {
  const [href] = useProperty(ontola.href);

  const lrs = useLRS();
  const openWindow = React.useCallback((e) => {
    e.preventDefault();

    lrs.actions.ontola.openWindow(href!.value);
  }, [lrs, href]);
  const handleClick = href && isDifferentWebsite(href.value)
    ? openWindow
    : onClick;

  return (
    <Tab
      icon={<Property label={schema.image} />}
      key={subject.value}
      label={<Property label={schema.name} />}
      value={subject.value}
      onChange={handleClick}
    />
  );
};

MenuItemTab.type = MenuTypes;

MenuItemTab.topology = tabBarTopology;

export default register(MenuItemTab);
