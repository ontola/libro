import PropTypes from 'prop-types';
import React from 'react';

import { Button } from '../../components';

import ErrorButtonWithFeedback from './ErrorButtonWithFeedback';
import { titleForStatus, errors } from './ErrorMessages';

const propTypes = {
  linkRequestStatus: PropTypes.shape({
    status: PropTypes.number,
  }),
  location: PropTypes.string,
  reloadLinkedObject: PropTypes.func,
};

class ErrorButtonSideBar extends ErrorButtonWithFeedback {
  render() {
    const { linkRequestStatus } = this.props;

    return (
      <Button
        margins
        small
        icon="exclamation-triangle"
        loading={this.state.loading}
        theme="transparant"
        title={titleForStatus(linkRequestStatus)}
        onClick={this.reload}
      >
        {errors.nl.error}
      </Button>
    );
  }
}

ErrorButtonSideBar.propTypes = propTypes;

export default ErrorButtonSideBar;
