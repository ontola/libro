import PropTypes from 'prop-types';
import React from 'react';

import { Button } from '../../components';

import { titleForStatus, errors } from './ErrorMessages';

const propTypes = {
  children: PropTypes.node,
  linkRequestStatus: PropTypes.shape({
    status: PropTypes.number,
  }),
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
  reloadLinkedObject: PropTypes.func.isRequired,
};

class ErrorButtonWithFeedback extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
    };

    this.reload = this.reload.bind(this);
  }

  reload() {
    this.setState({ loading: true });
    const disable = () => { this.setState({ loading: false }); };
    this
      .props
      .reloadLinkedObject()
      .then(disable)
      // TODO: bugsnag
      .catch(disable);
  }

  render() {
    const { linkRequestStatus } = this.props;

    return (
      <Button
        icon="refresh"
        loading={this.state.loading}
        title={titleForStatus(linkRequestStatus)}
        onClick={this.reload}
        {...this.props}
      >
        {this.props.children || errors.nl.again}
      </Button>
    );
  }
}

ErrorButtonWithFeedback.propTypes = propTypes;

export default ErrorButtonWithFeedback;
