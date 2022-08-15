import type { History } from 'history';
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';

import { Module } from '../Module';
import { appContext } from '../modules/Kernel/components/AppContext/appContext';
import { WebsiteCtx } from '../modules/Kernel/components/WebsiteContext/websiteContext';
import WebsiteContextProvider from '../modules/Kernel/components/WebsiteContext/WebsiteContextProvider';
import register from '../register';
import { WebManifest } from '../modules/Kernel/components/AppContext/WebManifest';

import IndexContainer from './IndexContainer';

interface AppProps {
  history: History;
  location?: string;
  manifestOverride?: WebManifest;
  modules: Module[];
  prerender?: boolean;
  websiteCtxOverride?: WebsiteCtx;
}

const App = ({
  history,
  location,
  prerender,
  manifestOverride,
  modules,
  websiteCtxOverride,
}: AppProps): JSX.Element => {
  const {
    lrs,
    manifest,
  } = React.useContext(appContext);

  register(lrs, modules);
  const manifestValue = manifestOverride ?? manifest;

  return (
    <React.StrictMode>
      <WebsiteContextProvider websiteCtxOverride={websiteCtxOverride}>
        <HelmetProvider>
          <IndexContainer
            history={history}
            location={location}
            manifest={manifestValue}
            prerender={prerender}
          />
        </HelmetProvider>
      </WebsiteContextProvider>
    </React.StrictMode>
  );
};

export default App;
