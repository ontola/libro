import { Skeleton } from '@material-ui/lab';
import rdf, { NamedNode } from '@ontologies/core';
import { Resource } from 'link-redux';
import React from 'react';
import { useHistory } from 'react-router';

import { WebManifest, appContext } from '../../appContext';
import ErrorBoundary from '../../components/ErrorBoundary';
import { Page } from '../../topologies/Page';

import { LibroDocument } from './builderContext';

export interface PageViewerProps {
  doc: LibroDocument;
  currentResource: string | undefined;
  manifest: Partial<WebManifest>;
}

const useCurrentResource = (): NamedNode | undefined => {
  const { resource } = React.useContext(appContext);
  const { location } = useHistory();
  const url = new URL(window.location.origin);
  url.pathname = location.pathname;
  url.search = location.search;
  url.hash = location.hash;

  switch(resource) {
  case undefined:
    return undefined;
  case 'auto':
    return rdf.namedNode(url.toString());
  default:
    return rdf.namedNode(resource);
  }
};

const PageViewer = (): JSX.Element => {
  const resource = useCurrentResource();

  return (
    <ErrorBoundary key={resource?.value}>
      <Page>
        {resource
          ? <Resource subject={resource} />
          : <Skeleton />}
      </Page>
    </ErrorBoundary>
  );
};

export default PageViewer;
