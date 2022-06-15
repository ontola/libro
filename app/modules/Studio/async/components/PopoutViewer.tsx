import React from 'react';

import ErrorBoundary from '../../../Common/components/ErrorBoundary';

import Viewer from './PageViewer';

const PopoutViewer = (): JSX.Element => (
  <div>
    <ErrorBoundary>
      <Viewer />
    </ErrorBoundary>
  </div>
);

export default PopoutViewer;
