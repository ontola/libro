import { LinkedResourceContainer } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { currentLocation } from '../../helpers/paths';
import { Page } from '../../topologies/Page';
import ErrorButtonWithFeedback from '../../views/Error/ErrorButtonWithFeedback';

const wildcardMap = new Map();
wildcardMap.set('/media_objects/', ['page']);

export default class LinkedObject extends React.PureComponent {
  static propTypes = {
    location: PropTypes.shape({
      pathname: PropTypes.string,
      search: PropTypes.string,
    }),
  };

  constructor(props) {
    super(props);

    this.retry = this.retry.bind(this);
    this.state = {
      caughtError: undefined,
    };
  }

  componentDidCatch(error, ignored) {
    this.setState({ caughtError: error });
    // TODO: bugsnag
  }

  retry() {
    this.setState({
      caughtError: undefined,
    });

    return Promise.resolve();
  }

  render() {
    const { location } = this.props;
    let routedLocation = location;

    if (typeof this.state.caughtError !== 'undefined') {
      return <ErrorButtonWithFeedback reloadLinkedObject={this.retry} />;
    }

    for (const pathMatch of wildcardMap.keys()) {
      if (typeof pathMatch === 'string') {
        if (location.pathname.startsWith(pathMatch)) {
          const search = new URLSearchParams(location.search);
          wildcardMap.get(pathMatch).forEach(v => search.delete(v));

          routedLocation = {
            ...location,
            search: search.toString() ? `?${search.toString()}` : '',
          };
          break;
        }
      }
    }

    return (
      <Page>
        <LinkedResourceContainer fetch subject={currentLocation(routedLocation)} />
      </Page>
    );
  }
}
