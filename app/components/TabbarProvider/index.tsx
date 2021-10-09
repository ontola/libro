import { NamedNode, isNamedNode } from '@ontologies/core';
import {
  useDataFetching,
  useGlobalIds,
} from 'link-redux';
import React from 'react';

import useMenuItems, { MenuItems } from '../../hooks/useMenuItems';
import ontola from '../../ontology/ontola';

const TabbarContext = React.createContext<MenuItems>({} as MenuItems);

export const useTabbar = (): MenuItems => React.useContext(TabbarContext);

interface TabbarProviderProps {
  children: React.ReactNode;
  menu?: NamedNode;
  redirect?: boolean;
}

const TabbarProvider = ({
  children,
  menu,
  redirect,
}: TabbarProviderProps): JSX.Element => {
  useDataFetching(isNamedNode(menu) ? menu : []);
  const [menuItems] = useGlobalIds(menu, ontola.menuItems);
  const {
    currentTab,
    handleChange,
    items,
  } = useMenuItems(menuItems, redirect);
  const context = React.useMemo(() => ({
    currentTab,
    handleChange,
    items,
  }), [
    currentTab,
    handleChange,
    items,
    menu,
  ]);

  return (
    <TabbarContext.Provider value={context}>
      {children}
    </TabbarContext.Provider>
  );
};

export default TabbarProvider;
