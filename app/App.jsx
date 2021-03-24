import { ConnectedRouter } from 'connected-react-router';
import { lrsType } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { hot } from 'react-hot-loader/root';
import { StaticRouter } from 'react-router';

import IndexContainer from './containers/IndexContainer';
import { getWebsiteContextFromWebsite } from './helpers/app';
import configureStore from './state';
import register from './views';
import { WebsiteContext } from './location';

const App = ({
  helmetContext,
  history,
  location,
  lrs,
  website,
  title,
}) => {
  const store = configureStore(history);
  register(lrs);
  const websiteCtxValue = getWebsiteContextFromWebsite(website);

  let router;
  if (__CLIENT__) {
    // eslint-disable-next-line react/prop-types
    router = ({ children }) => <ConnectedRouter history={history}>{children}</ConnectedRouter>;
  } else {
    const { websiteOrigin } = websiteCtxValue;
    const bugNormalized = location.replace(`${websiteOrigin}//`, `${websiteOrigin}/`);
    const iri = location && new URL(bugNormalized, websiteOrigin);
    const routerLocation = iri && iri.pathname + iri.search + iri.hash;

    // eslint-disable-next-line react/prop-types
    router = ({ children }) => <StaticRouter location={routerLocation}>{children}</StaticRouter>;
  }

  return (
    <React.StrictMode>
      <WebsiteContext.Provider value={websiteCtxValue}>
        <HelmetProvider context={helmetContext}>
          <IndexContainer
            Router={router}
            history={history}
            lrs={lrs}
            store={store}
            title={title}
          />
        </HelmetProvider>
      </WebsiteContext.Provider>
    </React.StrictMode>
  );
};

App.propTypes = {
  helmetContext: PropTypes.shape({}),
  history: PropTypes.shape({
    location: PropTypes.shape({}).isRequired,
  }),
  location: PropTypes.string,
  lrs: lrsType,
  title: PropTypes.string,
  website: PropTypes.string,
};

export default hot(App);
