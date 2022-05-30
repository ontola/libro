import type { History } from 'history';
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { StaticRouter } from 'react-router-dom/server';

import { appContext } from './appContext';
import IndexContainer, { RouterProps } from './containers/IndexContainer';
import { WebsiteCtx, getWebsiteContextFromWebsite } from './helpers/app';
import register from './views';
import { WebsiteContext } from './location';
import { WebManifest } from './WebManifest';

interface AppProps {
  history: History;
  location?: string;
  manifestOverride?: WebManifest,
  prerender?: boolean,
  websiteCtxOverride?: WebsiteCtx,
}

const createClientRouter = (history: History) => {
  const basename = __CLIENT__ && !__TEST__ && window.location.pathname.startsWith('/d/studio/viewer')
    ? 'd/studio/viewer'
    : '';

  return ({ children }: RouterProps) => (
    <HistoryRouter
      basename={basename}
      history={history}
    >
      {children}
    </HistoryRouter>
  );
};

const createServerRouter = (websiteCtxValue: WebsiteCtx, location: string | undefined) => {
  const { websiteOrigin } = websiteCtxValue;
  const bugNormalized = location?.replace(`${websiteOrigin}//`, `${websiteOrigin}/`);
  const iri = bugNormalized ? new URL(bugNormalized, websiteOrigin) : null;
  const routerLocation = iri ? iri.pathname + iri.search + iri.hash : undefined;

  return ({ children }: RouterProps) => (
    <StaticRouter location={routerLocation!}>
      {children}
    </StaticRouter>
  );
};

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
    website,
  } = React.useContext(appContext);

  register(lrs);

  const websiteCtxValue = websiteCtxOverride ?? getWebsiteContextFromWebsite(website);
  const manifestValue = manifestOverride ?? manifest;

  const router = __CLIENT__ || !prerender
    ? createClientRouter(history)
    : createServerRouter(websiteCtxValue, location);

  return (
    <React.StrictMode>
      <WebsiteContext.Provider value={websiteCtxValue}>
        <HelmetProvider>
          <IndexContainer
            Router={router}
            manifest={manifestValue}
          />
        </HelmetProvider>
      </WebsiteContext.Provider>
    </React.StrictMode>
  );
};

export default App;
