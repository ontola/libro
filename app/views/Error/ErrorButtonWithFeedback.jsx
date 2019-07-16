import { unstable, lrsType } from 'link-redux';
import PropTypes from 'prop-types';
import { NamedNode } from 'rdflib';
import React from 'react';
import {
  INTERNAL_SERVER_ERROR,
  PROXY_AUTHENTICATION_REQUIRED,
  TOO_MANY_REQUESTS,
} from 'http-status-codes';
import { FormattedMessage, injectIntl } from 'react-intl';

import { Button } from '../../components';
import { handle } from '../../helpers/logging';

import { titleForStatus } from './ErrorMessages';

const propTypes = {
  children: PropTypes.node,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func,
  }),
  linkRequestStatus: PropTypes.shape({
    status: PropTypes.number,
  }),
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
  lrs: lrsType,
  reloadLinkedObject: PropTypes.func.isRequired,
  reset: PropTypes.func,
};

const RETRYABLE_ERRORS = [
  PROXY_AUTHENTICATION_REQUIRED,
  TOO_MANY_REQUESTS,
];

export class ErrorButtonWithFeedbackBase extends React.Component {
  static contextType = unstable.LRSCtx;

  constructor() {
    super();

    this.state = {
      loading: false,
    };

    this.reload = this.reload.bind(this);
  }

  reload() {
    this.setState({ loading: true });
    const disable = () => {
      this.props.reset();
      this.setState({ loading: false });
    };

    if (!this.props.reloadLinkedObject) {
      this.setState({ loading: false });
      return this.props.reset();
    }

    this
      .props
      .reloadLinkedObject()
      .then(disable)
      .catch((e) => {
        handle(e);
        return disable();
      });

    return this
      .context
      .api
      .statusMap
      .forEach((s, i) => {
        if (s && (s.status >= INTERNAL_SERVER_ERROR || RETRYABLE_ERRORS.includes(s.status))) {
          this.context.queueEntity(NamedNode.findByStoreIndex(i), { reload: true });
        }
      });
  }

  render() {
    const { intl: { formatMessage }, linkRequestStatus } = this.props;

    return (
      <Button
        icon="refresh"
        loading={this.state.loading}
        title={titleForStatus(formatMessage, linkRequestStatus)}
        onClick={this.reload}
        {...this.props}
      >
        {this.props.children || <FormattedMessage id="https://app.argu.co/i18n/errors/inlineButton/label" />}
      </Button>
    );
  }
}

ErrorButtonWithFeedbackBase.propTypes = propTypes;

export default injectIntl(ErrorButtonWithFeedbackBase);
