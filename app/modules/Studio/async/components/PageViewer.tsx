import { Skeleton } from '@mui/material';
import HttpStatus from 'http-status-codes';
import {
  Resource,
  useDataInvalidation,
  useStatus,
} from 'link-redux';
import React from 'react';

import { Page } from '../../../../topologies/Page';
import ErrorBoundary from '../../../Common/components/ErrorBoundary';
import { useDev } from '../../../Common/hooks/useDev';
import { useCurrentResource } from '../hooks/useCurrentResource';

const PageViewer = (): JSX.Element => {
  useDev();
  const resource = useCurrentResource();
  useDataInvalidation(resource);
  const status = useStatus(resource ?? []);

  if (status?.status !== HttpStatus.OK) {
    return (
      <p>
        Resource
        {resource.toString()}
        {' '}
        not found
      </p>
    );
  }

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
