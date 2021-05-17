import React, { ComponentType } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

import '../../components/shared/init.scss';
import PageError from '../../components/Error/PageError';
import { getMetaContent } from '../../helpers/arguHelpers';
import { handle } from '../../helpers/logging';
import routes from '../index';

import './index.scss';
import ContentFrame from './ContentFrame';

export interface AppProps extends RouteComponentProps {
  title?: string;
}

export interface AppState {
  caughtError?: Error;
}

class App extends React.PureComponent<AppProps, AppState> {
  constructor(props: AppProps) {
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

    const theme = getMetaContent('theme');
    const themeOptions = new URLSearchParams(getMetaContent('themeOpts'));

    return (
      <ContentFrame
        theme={theme}
        themeOptions={themeOptions}
        title={this.props.title}
      >
        {routes}
      </ContentFrame>
    );
  }
}

export default withRouter<AppProps, ComponentType<AppProps>>(App);
