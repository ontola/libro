import React from 'react';

import PageError from '../../components/Error/PageError';
import { handle } from '../../helpers/logging';
import Routes from '../index';

import ContentFrame from './ContentFrame';

export interface AppState {
  caughtError?: Error;
}

class App extends React.PureComponent<unknown, AppState> {
  constructor(props: unknown) {
    super(props);

    this.retry = this.retry.bind(this);
    this.state = {
      caughtError: undefined,
    };
  }

  componentDidMount(): void {
    if (__CLIENT__) {
      window.scrollTo(0, 0);
    }
  }

  componentDidCatch(e: Error) {
    handle(e);
    this.setState({ caughtError: e });
  }

  retry(): Promise<void> {
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
        <Routes />
      </ContentFrame>
    );
  }
}

export default App;
