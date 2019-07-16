import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';

import { Button } from '../../components';

import { ErrorButtonWithFeedbackBase } from './ErrorButtonWithFeedback';
import { titleForStatus } from './ErrorMessages';

const propTypes = {
  intl: PropTypes.shape({
    formatMessage: PropTypes.func,
  }),
  linkRequestStatus: PropTypes.shape({
    status: PropTypes.number,
  }),
  location: PropTypes.string,
  reloadLinkedObject: PropTypes.func.isRequired,
};

class ErrorButtonSideBar extends ErrorButtonWithFeedbackBase {
  render() {
    const { intl: { formatMessage }, linkRequestStatus } = this.props;

    return (
      <Button
        small
        icon="exclamation-triangle"
        loading={this.state.loading}
        theme="subtle"
        title={titleForStatus(formatMessage, linkRequestStatus)}
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

export default injectIntl(ErrorButtonSideBar);
