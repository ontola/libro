import rdf, { NamedNode } from '@ontologies/core';
import React from 'react';
import { useLocation, useNavigate } from 'react-router';

import { useContainerToArr } from '../../Core/hooks/useContainerToArr';

export type ChangeMenuTab = (e: Event, url: string) => void;

export interface MenuItems {
  currentTab: NamedNode | null;
  handleChange: ChangeMenuTab;
  items: NamedNode[];
}

const useMenuItems = (menuItemsIRI: NamedNode | undefined, redirect?: boolean): MenuItems => {
  const location = useLocation();
  const navigate = useNavigate();
  const [items] = useContainerToArr<NamedNode>(menuItemsIRI);
  const firstItem = items[0];
  const [currentTab, setCurrentTab] = React.useState<NamedNode | null>(null);

  const handleChange = React.useCallback((e: Event, url: string) => {
    e.preventDefault();

    if (redirect && url) {
      const fragment = new URL(url).hash;
      const newPath = `${location.pathname}${fragment}`;
      navigate(newPath, { replace: true });
    }

    setCurrentTab(rdf.namedNode(url));
  }, [menuItemsIRI, navigate, setCurrentTab, redirect]);

  React.useEffect(() => {
    setCurrentTab(null);
  }, [menuItemsIRI, firstItem]);

  React.useEffect(() => {
    const current = items.find((s) => new URL(s.value).hash === location.hash);

    if (current) {
      setCurrentTab(current);
    } else if (firstItem) {
      setCurrentTab(firstItem);
    }
  }, [items, location, firstItem]);

  return {
    currentTab,
    handleChange,
    items,
  };
};

export default useMenuItems;
