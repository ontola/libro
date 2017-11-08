import { RenderStoreProvider } from 'link-redux';
import LinkedRenderStore from 'link-lib';
import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, applyRouterMiddleware } from 'react-router';
import { useScroll } from 'react-router-scroll';

import routes from '../routes';

const propTypes = {
  history: PropTypes.shape({
    go: PropTypes.func,
    goBack: PropTypes.func,
    push: PropTypes.func,
    replace: PropTypes.func,
    transitionTo: PropTypes.func,
  }).isRequired,
  linkedRenderStore: PropTypes.instanceOf(LinkedRenderStore).isRequired,
  store: PropTypes.shape({
    dispatch: PropTypes.func.isRequired,
    getState: PropTypes.func.isRequired,
    subscribe: PropTypes.func.isRequired,
  }).isRequired,
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
