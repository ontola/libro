import { RenderStoreProvider } from 'link-redux';
import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { applyRouterMiddleware, Router } from 'react-router';
import { useScroll } from 'react-router-scroll';

import routes from '../routes';

const propTypes = {
  history: PropTypes.object.isRequired,
  linkedRenderStore: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
};

const IndexContainer = ({ linkedRenderStore, store, history }) => (
  <Provider store={store}>
    <RenderStoreProvider linkedRenderStore={linkedRenderStore}>
      <Router
        history={history}
        render={__CLIENT__ ? applyRouterMiddleware(useScroll()) : undefined}
        routes={routes}
        // onUpdate={() => window.scrollTo(0, 0)}
      />
    </RenderStoreProvider>
  </Provider>
);

IndexContainer.propTypes = propTypes;

export default IndexContainer;
