import rdf, { NamedNode } from '@ontologies/core';
import React from 'react';
import { useHistory } from 'react-router';

import { appContext } from '../../../appContext';

export const useCurrentResource = (): NamedNode | undefined => {
  const { resource } = React.useContext(appContext);
  const { location } = useHistory();
  const url = new URL(window.location.origin);
  url.pathname = location.pathname;
  url.search = location.search;
  url.hash = location.hash;

  switch (resource) {
  case undefined:
    return undefined;
  case 'auto':
    return rdf.namedNode(url.toString());
  default:
    return rdf.namedNode(resource);
  }
};
