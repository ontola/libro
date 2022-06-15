import type { History } from 'history';
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';

import { appContext } from '../modules/Core/components/AppContext/appContext';
import { WebsiteCtx } from '../modules/Core/components/WebsiteContext/websiteContext';
import WebsiteContextProvider from '../modules/Core/components/WebsiteContext/WebsiteContextProvider';
import register from '../views';
import { WebManifest } from '../WebManifest';

import IndexContainer from './IndexContainer';

interface AppProps {
  history: History;
  location?: string;
  manifestOverride?: WebManifest,
  prerender?: boolean,
  websiteCtxOverride?: WebsiteCtx,
}

const App = ({
  history,
  location,
  prerender,
  manifestOverride,
  websiteCtxOverride,
}: AppProps): JSX.Element => {
  const {
    lrs,
    manifest,
  } = React.useContext(appContext);

  register(lrs);
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
