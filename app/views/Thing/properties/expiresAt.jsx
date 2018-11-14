import { linkedPropType, register } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import {
  defineMessages,
  FormattedMessage,
  FormattedRelative,
  injectIntl,
  intlShape,
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

const propTypes = {
  intl: intlShape,
  linkedProp: linkedPropType,
  short: PropTypes.bool,
};

class ExpiresAt extends React.PureComponent {
  static type = NS.schema('Thing');

  static property = NS.argu('expiresAt');

  static topology = detailsBarTopology;

  static hocs = [injectIntl];

  static propTypes = propTypes;

  render() {
    const { intl, linkedProp, short } = this.props;

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
              relativeDate: <FormattedRelative format="numeric" value={d} />,
            }}
          />
        )}
        title={intl.formatMessage(
          messages.expiringTooltip,
          { date: intl.formatDate(d) }
        )}
      />
    );
  }
}

export default register(ExpiresAt);
