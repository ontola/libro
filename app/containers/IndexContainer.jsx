import LinkedRenderStore from 'link-lib';
import { RenderStoreProvider } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { Provider } from 'react-redux';

import AppFrame from '../routes/App';

const propTypes = {
  Router: PropTypes.func,
  history: PropTypes.shape({
    go: PropTypes.func,
    goBack: PropTypes.func,
    push: PropTypes.func,
    replace: PropTypes.func,
    transitionTo: PropTypes.func,
  }).isRequired,
  lrs: PropTypes.instanceOf(LinkedRenderStore).isRequired,
  store: PropTypes.shape({
    dispatch: PropTypes.func.isRequired,
    getState: PropTypes.func.isRequired,
    subscribe: PropTypes.func.isRequired,
  }).isRequired,
};

const IndexContainer = ({
  Router,
  history,
  lrs,
  store,
}) => (
  <Provider store={store}>
    <RenderStoreProvider value={lrs}>
      <Router history={history}>
        <AppFrame />
      </Router>
    </RenderStoreProvider>
  </Provider>
);

IndexContainer.propTypes = propTypes;

export default IndexContainer;
