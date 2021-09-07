import { Skeleton } from '@material-ui/lab';
import { Resource } from 'link-redux';
import React from 'react';

import ErrorBoundary from '../../../components/ErrorBoundary';
import { Page } from '../../../topologies/Page';
import { useCurrentResource } from '../hooks/useCurrentResource';

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
