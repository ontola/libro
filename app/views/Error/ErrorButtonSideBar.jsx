import PropTypes from 'prop-types';
import React from 'react';
import FontAwesome from 'react-fontawesome';
import { defineMessages, FormattedMessage, injectIntl } from 'react-intl';

import { BlurButton } from '../../components';
import HeaderLinkIcon from '../../components/HeaderLink/HeaderLinkIcon';
import HeaderLinkLabel from '../../components/HeaderLink/HeaderLinkLabel';

import ErrorButtonWithFeedback from './ErrorButtonWithFeedback';
import { titleForStatus } from './ErrorMessages';

const messages = defineMessages({
  clickRetry: {
    defaultMessage: 'Click to retry',
    id: 'https://app.argu.co/i18n/errors/clickToRetry/label',
  },
});

const propTypes = {
  linkRequestStatus: PropTypes.shape({
    status: PropTypes.number,
  }),
  location: PropTypes.string,
  reloadLinkedObject: PropTypes.func.isRequired,
};

class ErrorButtonSideBar extends ErrorButtonWithFeedback {
  render() {
    const { intl, linkRequestStatus } = this.props;

    const retryText = intl.formatMessage(messages.clickRetry);

    return (
      <BlurButton
        className="HeaderLink"
        style={{
          cursor: 'pointer',
        }}
        title={`${titleForStatus(linkRequestStatus)} ${retryText}`}
        onClick={this.reload}
      >
        <HeaderLinkIcon>
          <FontAwesome
            name={this.state.loading ? 'spinner' : 'exclamation-triangle'}
            spin={this.state.loading}
          />
        </HeaderLinkIcon>
        <HeaderLinkLabel>
          <FormattedMessage id="https://app.argu.co/i18n/errors/inlineButton/label" />
        </HeaderLinkLabel>
      </BlurButton>
    );
  }
}

ErrorButtonSideBar.propTypes = propTypes;

export default injectIntl(ErrorButtonSideBar);
