import { ConnectedRouter } from 'connected-react-router';
import { History } from 'history';
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { StaticRouter } from 'react-router';

import { appContext } from './appContext';
import IndexContainer, { RouterProps } from './containers/IndexContainer';
import { getWebsiteContextFromWebsite } from './helpers/app';
import configureStore from './state';
import register from './views';
import { WebsiteContext } from './location';

interface AppProps {
  history: History;
  location?: string;
}

const App = ({
  history,
  location,
}: AppProps): JSX.Element => {
  const { lrs, website } = React.useContext(appContext);
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
            store={store}
          />
        </HelmetProvider>
      </WebsiteContext.Provider>
    </React.StrictMode>
  );
};

export default App;
