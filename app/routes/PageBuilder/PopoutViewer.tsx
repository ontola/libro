import React from 'react';

import ErrorBoundary from '../../components/ErrorBoundary';

import Viewer from './PageViewer';


export const PopoutViewer = (): JSX.Element => (
  <div>
    <ErrorBoundary>
      <Viewer />
    </ErrorBoundary>
  </div>
);
