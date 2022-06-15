import rdf, { NamedNode } from '@ontologies/core';
import type { Location } from 'history';
import React from 'react';
import { useLocation } from 'react-router';

import { appContext } from '../../../Core/components/AppContext/appContext';

export const pageViewerRelativeIRI = (
  website: string,
  location: Location,
): string => {
  const url = new URL(website);

  let pathAddition = location.pathname.startsWith(url.pathname)
    ? location.pathname.slice(url.pathname.length)
    : location.pathname;

  if (location.pathname === '/') {
    pathAddition = '';
  }

  url.pathname = url.pathname + pathAddition;
  url.search = location.search;
  url.hash = location.hash;

  return url.toString();
};

export const useCurrentResource = (): NamedNode => {
  const { resource, website } = React.useContext(appContext);
  const location = useLocation();
  const url = pageViewerRelativeIRI(website, location);

  switch (resource) {
  case undefined:
  case 'auto':
    return rdf.namedNode(url.toString());
  default:
    return rdf.namedNode(resource);
  }
};
