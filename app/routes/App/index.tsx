import React, { ComponentType } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

import '../../components/shared/init.scss';
import PageError from '../../components/Error/PageError';
import { handle } from '../../helpers/logging';
import routes from '../index';

import ContentFrame from './ContentFrame';

export interface AppState {
  caughtError?: Error;
}

class App extends React.PureComponent<RouteComponentProps, AppState> {
  constructor(props: RouteComponentProps) {
    super(props);

    this.retry = this.retry.bind(this);
    this.state = {
      caughtError: undefined,
    };
  }

  componentDidMount() {
    if (__CLIENT__) {
      window.scrollTo(0, 0);
    }
  }

  componentDidCatch(e: Error) {
    handle(e);
    this.setState({ caughtError: e });
  }

  retry() {
    this.setState({
      caughtError: undefined,
    });

    return Promise.resolve();
  }

  render() {
    if (typeof this.state.caughtError !== 'undefined') {
      return (
        <PageError
          caughtError={this.state.caughtError}
          reloadLinkedObject={this.retry}
        />
      );
    }

    return (
      <ContentFrame>
        {routes}
      </ContentFrame>
    );
  }
}

export default withRouter<RouteComponentProps, ComponentType<RouteComponentProps>>(App);
