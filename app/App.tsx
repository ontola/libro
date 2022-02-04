import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { StaticRouter } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import { appContext } from './appContext';
import IndexContainer, { RouterProps } from './containers/IndexContainer';
import { WebsiteCtx, getWebsiteContextFromWebsite } from './helpers/app';
import register from './views';
import { WebsiteContext } from './location';
import { WebManifest } from './WebManifest';

interface AppProps {
  location?: string;
  manifestOverride?: WebManifest,
  prerender?: boolean,
  websiteCtxOverride?: WebsiteCtx,
}

const App = ({
  location,
  prerender,
  manifestOverride,
  websiteCtxOverride,
}: AppProps): JSX.Element => {
  const { lrs, manifest, website } = React.useContext(appContext);
  register(lrs);
  const websiteCtxValue = websiteCtxOverride ?? getWebsiteContextFromWebsite(website);
  const manifestValue = manifestOverride ?? manifest;

  let router;

  if (__CLIENT__ || !prerender) {
    router = ({ children }: RouterProps) => (
      <BrowserRouter>
        {children}
      </BrowserRouter>
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
          />
        </HelmetProvider>
      </WebsiteContext.Provider>
    </React.StrictMode>
  );
};

export default App;
