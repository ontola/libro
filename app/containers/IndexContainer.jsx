import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { SearchkitProvider } from 'searchkit';

import routes from '../routes';

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
        <SearchkitProvider searchkit={sk}>
          <Router history={history} routes={routes} />
        </SearchkitProvider>
      </Provider>
    );
  }
}

IndexContainer.propTypes = propTypes;
IndexContainer.childContextTypes = contextTypes;

export default IndexContainer;
