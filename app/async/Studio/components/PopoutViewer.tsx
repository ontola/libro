import React from 'react';

import ErrorBoundary from '../../../components/ErrorBoundary';

import Viewer from './PageViewer';

const PopoutViewer = (): JSX.Element => (
  <div>
    <ErrorBoundary>
      <Viewer />
    </ErrorBoundary>
  </div>
);

export default PopoutViewer;
