import { ConnectedRouter } from 'connected-react-router/immutable';
import PropTypes from 'prop-types';
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { StaticRouter } from 'react-router';

import IndexContainer from './containers/IndexContainer';
import { getWebsiteContextFromWebsite } from './helpers/app';
import history from './helpers/history';
import LinkedRenderStore from './helpers/LinkedRenderStore';
import configureStore from './state';
import register from './views';
import { WebsiteContext } from './location';

const store = configureStore();

export default (lrs) => {
  register(lrs);

  const App = ({ helmetContext, location, website }) => {
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
      <WebsiteContext.Provider value={websiteCtxValue}>
        <HelmetProvider context={helmetContext}>
          <IndexContainer
            Router={router}
            history={history}
            lrs={lrs || LinkedRenderStore}
            store={store}
          />
        </HelmetProvider>
      </WebsiteContext.Provider>
    );
  };

  App.propTypes = {
    helmetContext: PropTypes.shape({}),
    location: PropTypes.shape({}),
    website: PropTypes.shape({}),
  };

  return App;
};
