import { ConnectedRouter } from 'connected-react-router';
import { MemoryHistory } from 'history';
import { LinkReduxLRSType } from 'link-redux';
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { hot } from 'react-hot-loader/root';
import { StaticRouter } from 'react-router';

import IndexContainer, { RouterProps } from './containers/IndexContainer';
import { getWebsiteContextFromWebsite } from './helpers/app';
import configureStore from './state';
import register from './views';
import { WebsiteContext } from './location';

interface AppProps {
  history: MemoryHistory;
  location?: string;
  lrs: LinkReduxLRSType;
  title?: string;
  website?: string;
}

const App = ({
  history,
  location,
  lrs,
  website,
  title,
}: AppProps) => {
  const store = configureStore(history);
  register(lrs);
  const websiteCtxValue = getWebsiteContextFromWebsite(website);

  let router;

  if (__CLIENT__) {
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
            lrs={lrs}
            store={store}
            title={title}
          />
        </HelmetProvider>
      </WebsiteContext.Provider>
    </React.StrictMode>
  );
};

export default hot(App);
