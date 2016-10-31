import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import { applyRouterMiddleware, Router } from 'react-router';
import { SearchkitProvider } from 'searchkit';
import { useScroll } from 'react-router-scroll';
import { RenderStoreProvider } from 'link-redux';

import routes from '../routes';
import LinkedRenderStore from '../helpers/LinkedRenderStore';

const propTypes = {
  store: PropTypes.object.isRequired,
  sk: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

const contextTypes = {
  searchkit: PropTypes.object,
};

class IndexContainer extends Component {
  getChildContext() {
    return { searchkit: this.props.sk };
  }

  render() {
    const { store, sk, history } = this.props;
    return (
      <Provider store={store}>
        <RenderStoreProvider linkedRenderStore={LinkedRenderStore}>
          <SearchkitProvider searchkit={sk}>
            <Router
              history={history}
              routes={routes}
              render={applyRouterMiddleware(useScroll())}
              // onUpdate={() => window.scrollTo(0, 0)}
            />
          </SearchkitProvider>
        </RenderStoreProvider>
      </Provider>
    );
  }
}

IndexContainer.propTypes = propTypes;
IndexContainer.childContextTypes = contextTypes;

export default IndexContainer;
