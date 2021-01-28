import rdf from '@ontologies/core';
import * as rdfx from '@ontologies/rdf';
import { useResourceProperty } from 'link-redux';
import React from 'react';
import { useHistory, useLocation } from 'react-router';

import { retrievePath } from '../../../helpers/iris';
import { currentLocation } from '../../../helpers/paths';
import { useContainerToArr } from '../../../hooks/useContainerToArr';

const useMenuItems = (menuItemsIRI, redirect) => {
  const location = useLocation();
  const history = useHistory();
  const items = useContainerToArr(menuItemsIRI);
  const [firstItem] = useResourceProperty(menuItemsIRI, rdfx.ns('_0'));
  const [currentTab, setCurrentTab] = React.useState(null);

  const handleChange = (e, url) => {
    e.preventDefault();
    if (redirect) {
      history.replace(retrievePath(url));
    }
    setCurrentTab(rdf.namedNode(url));
  };

  React.useEffect(() => {
    setCurrentTab(null);
  }, [menuItemsIRI, firstItem]);

  React.useEffect(() => {
    if (Array.isArray(items)) {
      const current = items.find((s) => rdf.equals(s, currentLocation(location)));
      if (current) {
        setCurrentTab(current);
      } else {
        setCurrentTab(firstItem);
      }
    }
  }, [items, firstItem]);

  return {
    currentTab,
    handleChange,
    items,
  };
};

export default useMenuItems;
