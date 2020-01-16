import { register } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';

import { Button } from '../../components';
import ll from '../../ontology/ll';
import { attributeListTopology } from '../../topologies/AttributeList';
import { cardTopology } from '../../topologies/Card';
import { cardFixedTopology } from '../../topologies/Card/CardFixed';
import { cardFloatTopology } from '../../topologies/Card/CardFloat';
import { cardMainTopology } from '../../topologies/Card/CardMain';
import { cardMicroRowTopology } from '../../topologies/Card/CardMicroRow';
import { cardRowTopology } from '../../topologies/Card/CardRow';
import { containerFloatTopology } from '../../topologies/Container/ContainerFloat';
import { detailsBarTopology } from '../../topologies/DetailsBar';
import { hoverBoxTopology } from '../../topologies/HoverBox';
import { inlineTopology } from '../../topologies/Inline';
import { omniformFieldsTopology } from '../../topologies/OmniformFields/OmniformFields';
import { parentTopology } from '../../topologies/Parent';
import { voteBubbleTopology } from '../../topologies/VoteBubble';
import { voteEventResultTopology } from '../../topologies/VoteEventResult';

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

ErrorButtonSideBar.type = ll.ErrorResource;

ErrorButtonSideBar.topology = [
  attributeListTopology,
  cardFixedTopology,
  cardFloatTopology,
  cardTopology,
  cardMainTopology,
  cardMicroRowTopology,
  cardRowTopology,
  containerFloatTopology,
  detailsBarTopology,
  hoverBoxTopology,
  inlineTopology,
  omniformFieldsTopology,
  parentTopology,
  voteBubbleTopology,
  voteEventResultTopology,
];

ErrorButtonSideBar.hocs = [injectIntl];

ErrorButtonSideBar.propTypes = propTypes;

export default register(ErrorButtonSideBar);
