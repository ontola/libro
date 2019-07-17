import { linkedPropType, register } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import {
  FormattedMessage,
  FormattedRelativeTime,
  defineMessages,
  injectIntl,
  useIntl,
} from 'react-intl';

import Detail from '../../../components/Detail';
import isPastDate from '../../../helpers/date';
import { NS } from '../../../helpers/LinkedRenderStore';
import { detailsBarTopology } from '../../../topologies/DetailsBar';

const messages = defineMessages({
  closedTooltip: {
    defaultMessage: 'Closed on {date}',
    id: 'https://app.argu.co/i18n/expireable/states/closed/tooltip',
  },
  expiringTooltip: {
    defaultMessage: 'Closing on {date}',
    id: 'https://app.argu.co/i18n/expireable/states/expiring/tooltip',
  },
});

const ExpiresAt = ({ linkedProp, short }) => {
  const intl = useIntl();
  const d = new Date(linkedProp.value);

  if (isPastDate(d)) {
    return (
      <Detail
        icon="lock"
        text={short && (
          <FormattedMessage
            defaultMessage="closed"
            id="https://app.argu.co/i18n/expireable/states/closed/label"
          />
        )}
        title={intl.formatMessage(
          messages.closedTooltip,
          { date: intl.formatDate(d) }
        )}
      />
    );
  }

  return (
    <Detail
      icon="exclamation"
      text={(
        <FormattedMessage
          defaultMessage="Due {relativeDate}"
          id="https://app.argu.co/i18n/expireable/states/expiring/label"
          values={{
            relativeDate: <FormattedRelativeTime numeric="auto" value={d} />,
          }}
        />
      )}
      title={intl.formatMessage(
        messages.expiringTooltip,
        { date: intl.formatDate(d) }
      )}
    />
  );
};

ExpiresAt.type = NS.schema('Thing');

ExpiresAt.property = NS.argu('expiresAt');

ExpiresAt.topology = detailsBarTopology;

ExpiresAt.hocs = [injectIntl];

ExpiresAt.propTypes = {
  linkedProp: linkedPropType,
  short: PropTypes.bool,
};

export default register(ExpiresAt);
