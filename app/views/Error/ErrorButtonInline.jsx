import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Button } from '../../components';

import ErrorButtonWithFeedback from './ErrorButtonWithFeedback';
import { titleForStatus } from './ErrorMessages';

const propTypes = {
  linkRequestStatus: PropTypes.shape({
    status: PropTypes.number,
  }),
  location: PropTypes.string,
  reloadLinkedObject: PropTypes.func.isRequired,
};

class ErrorButtonSideBar extends ErrorButtonWithFeedback {
  render() {
    const { linkRequestStatus } = this.props;

    return (
      <Button
        small
        icon="exclamation-triangle"
        loading={this.state.loading}
        theme="subtle"
        title={titleForStatus(linkRequestStatus)}
        onClick={this.reload}
      >
        <FormattedMessage
          defaultMessage="Retry"
          id="https://app.argu.co/i18n/errors/inlineButton/label"
        />
      </Button>
    );
  }
}

ErrorButtonSideBar.propTypes = propTypes;

export default ErrorButtonSideBar;
