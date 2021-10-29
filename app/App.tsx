import { ConnectedRouter } from 'connected-react-router';
import { History } from 'history';
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { StaticRouter } from 'react-router';

import { WebManifest, appContext } from './appContext';
import IndexContainer, { RouterProps } from './containers/IndexContainer';
import { WebsiteCtx, getWebsiteContextFromWebsite } from './helpers/app';
import configureStore from './state';
import register from './views';
import { WebsiteContext } from './location';

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
  const { lrs, manifest, website } = React.useContext(appContext);
  const store = configureStore(history);
  register(lrs);
  const websiteCtxValue = websiteCtxOverride ?? getWebsiteContextFromWebsite(website);
  const manifestValue = manifestOverride ?? manifest;

  let router;

  if (__CLIENT__ || prerender !== true) {
    router = ({ children }: RouterProps) => (
      <ConnectedRouter history={history}>
        {children}
      </ConnectedRouter>
    );
  } else {
    const { websiteOrigin } = websiteCtxValue;
    const bugNormalized = location?.replace(`${websiteOrigin}//`, `${websiteOrigin}/`);
    const iri = bugNormalized ? new URL(bugNormalized, websiteOrigin) : null;
    const routerLocation = iri ? iri.pathname + iri.search + iri.hash : undefined;

    router = ({ children }: RouterProps) => (
      <StaticRouter location={routerLocation}>
        {children}
      </StaticRouter>
    );
  }

  return (
    <React.StrictMode>
      <WebsiteContext.Provider value={websiteCtxValue}>
        <HelmetProvider>
          <IndexContainer
            Router={router}
            manifest={manifestValue}
            store={store}
          />
        </HelmetProvider>
      </WebsiteContext.Provider>
    </React.StrictMode>
  );
};

export default App;
