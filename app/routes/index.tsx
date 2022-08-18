import React from 'react';
import { Route, Routes } from 'react-router';

import PopoutViewer from '../modules/Studio/components/PopoutViewerLoader';
import RDFStudio from '../modules/Studio/components/StudioLoader';

import DevBrowser from './DevBrowser';
import LinkedObject from './LinkedObject';
import Sandbox from './Sandbox';

const shouldRenderPopoutViewerRoute = () => __CLIENT__ && window.location.pathname.startsWith('/d/studio/viewer');

export default (): JSX.Element => (
  <Routes>
    {shouldRenderPopoutViewerRoute() && (
      <Route
        element={<PopoutViewer />}
        key="popout-viewer"
        path="*"
      />
    )}
    <Route
      element={<LinkedObject />}
      key="linkedResources"
      path="*"
    />
    <Route path="libro">
      <Route
        element={<RDFStudio />}
        key="studio"
        path="studio"
      />
      {__DEVELOPMENT__ && (
        <React.Fragment>
          <Route
            element={<DevBrowser />}
            key="devbrowser"
            path="browser"
          />

          <Route
            element={<Sandbox />}
            key="sandbox"
            path="sandbox"
          />
        </React.Fragment>
      )}
    </Route>
  </Routes>
);
