import rdf, { NamedNode } from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
import { useResourceProperty } from 'link-redux';
import React from 'react';
import { useHistory, useLocation } from 'react-router';

import { useContainerToArr } from './useContainerToArr';

export type ChangeMenuTab = (e: Event, url: string) => void;

export interface MenuItems {
  currentTab: NamedNode | null;
  handleChange: ChangeMenuTab;
  items?: NamedNode[] | Promise<void>;
}

const useMenuItems = (menuItemsIRI: NamedNode | undefined, redirect?: boolean): MenuItems => {
  const location = useLocation();
  const history = useHistory();
  const items = useContainerToArr<NamedNode>(menuItemsIRI);
  const [firstItem] = useResourceProperty(menuItemsIRI, rdfx.ns('_0')) as NamedNode[];
  const [currentTab, setCurrentTab] = React.useState<NamedNode | null>(null);

  const handleChange = React.useCallback((e: Event, url: string) => {
    e.preventDefault();
    if (redirect && url) {
      const fragment = new URL(url).hash;
      const newPath = `${location.pathname}${fragment}`;
      history.replace(newPath);
    }
    setCurrentTab(rdf.namedNode(url));
  }, [menuItemsIRI, history, setCurrentTab, redirect]);

  React.useEffect(() => {
    setCurrentTab(null);
  }, [menuItemsIRI, firstItem]);

  React.useEffect(() => {
    if (Array.isArray(items)) {
      const current = items.find((s) => new URL(s.value).hash === location.hash);
      if (current) {
        setCurrentTab(current);
      } else if (firstItem) {
        setCurrentTab(firstItem);
      }
    }
  }, [items, location, firstItem]);

  return {
    currentTab,
    handleChange,
    items,
  };
};

export default useMenuItems;
