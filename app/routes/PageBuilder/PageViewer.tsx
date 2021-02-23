import { Resource } from 'link-redux';
import React from 'react';

import ErrorBoundary from '../../components/ErrorBoundary';
import { Page } from '../../topologies/Page';

import { builderContext } from './builderContext';

const PageViewer = (): JSX.Element => {
  const { index, resources } = React.useContext(builderContext);
  const currentResource = resources[index];

  return (
    <ErrorBoundary key={currentResource.value}>
      <Page>
        <Resource subject={currentResource} />
      </Page>
    </ErrorBoundary>
  );
};

export default PageViewer;
