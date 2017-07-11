import { RenderStoreProvider } from 'link-redux';
import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import { applyRouterMiddleware, Router } from 'react-router';
import { useScroll } from 'react-router-scroll';
import { SearchkitProvider } from 'searchkit';

import routes from '../routes';

const propTypes = {
  history: PropTypes.object.isRequired,
  linkedRenderStore: PropTypes.object.isRequired,
  sk: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
};

const contextTypes = {
  searchkit: PropTypes.object,
};

class IndexContainer extends Component {
  getChildContext() {
    return { searchkit: this.props.sk };
  }

  render() {
    const { linkedRenderStore, sk, store, history } = this.props;
    return (
      <Provider store={store}>
        <RenderStoreProvider linkedRenderStore={linkedRenderStore}>
          <SearchkitProvider searchkit={sk}>
            <Router
              history={history}
              render={__CLIENT__ ? applyRouterMiddleware(useScroll()) : undefined}
              routes={routes}
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
