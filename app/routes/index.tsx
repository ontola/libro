import React from 'react';
import { Route, Routes } from 'react-router';

import PopoutViewer from '../modules/Studio/components/PopoutViewerLoader';
import RDFStudio from '../modules/Studio/components/StudioLoader';

import LinkedObject from './LinkedObject';
import DevBrowser from './DevBrowser';
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
    <Route path="d">
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
