import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import '../../components/shared/init.scss';
import { getMetaContent } from '../../helpers/arguHelpers';
import { handle } from '../../helpers/logging';
import ErrorButtonWithFeedback from '../../components/Error/ErrorButtonWithFeedback';
import routes from '../index';

import './index.scss';
import ContentFrame from './ContentFrame';

class App extends React.PureComponent {
  static propTypes = {
    title: PropTypes.string,
  };

  constructor(props) {
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

  componentDidCatch(e, ignored) {
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
      return <ErrorButtonWithFeedback reloadLinkedObject={this.retry} />;
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

export default withRouter(App);
