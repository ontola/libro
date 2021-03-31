import PropTypes from 'prop-types';
import React from 'react';
import FontAwesome from 'react-fontawesome';
import {
  FormattedMessage,
  injectIntl,
} from 'react-intl';

import BlurButton from '../../components/BlurButton';
import NavbarLinkIcon from '../../components/NavbarLink/NavbarLinkIcon';
import NavbarLinkLabel from '../../components/NavbarLink/NavbarLinkLabel';
import { errorMessages } from '../../translations/messages';

import { ErrorButtonWithFeedbackBase } from './ErrorButtonWithFeedback';
import { messageBodyForStatus } from './ErrorMessages';

const propTypes = {
  linkRequestStatus: PropTypes.shape({
    status: PropTypes.number,
  }),
  location: PropTypes.string,
  reloadLinkedObject: PropTypes.func.isRequired,
};

class ErrorButtonHeader extends ErrorButtonWithFeedbackBase {
  render() {
    const { intl, linkRequestStatus } = this.props;

    const retryText = intl.formatMessage(errorMessages.clickRetry);
    let bodyText = messageBodyForStatus(linkRequestStatus);
    if (bodyText) {
      bodyText = intl.formatMessage(bodyText);
    }

    return (
      <BlurButton
        className="NavbarLink"
        style={{
          cursor: 'pointer',
        }}
        title={`${bodyText} ${retryText}`}
        onClick={this.reload}
      >
        <NavbarLinkIcon>
          <FontAwesome
            name={this.state.loading ? 'spinner' : 'exclamation-triangle'}
            spin={this.state.loading}
          />
        </NavbarLinkIcon>
        <NavbarLinkLabel>
          <FormattedMessage
            defaultMessage="Retry"
            id="https://app.argu.co/i18n/errors/inlineButton/label"
          />
        </NavbarLinkLabel>
      </BlurButton>
    );
  }
}

ErrorButtonHeader.propTypes = propTypes;

export default injectIntl(ErrorButtonHeader);
