import { selectUnit } from '@formatjs/intl-utils';
import { Literal } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import { FC, register } from 'link-redux';
import React from 'react';
import {
  FormattedMessage,
  FormattedRelativeTime,
  useIntl,
} from 'react-intl';

import { statusMessages } from '../../../../../translations/messages';
import argu from '../../../../Argu/ontology/argu';
import Detail from '../../../components/Detail';
import { filterUpdateInterval, useDateUpdateInterval } from '../../../hooks/useDateUpdateInterval';
import isPastDate from '../../../lib/date';
import { detailsBarTopology } from '../../../topologies';

interface PropTypes {
  linkedProp: Literal;
  short: boolean;
}

const ExpiresAt: FC<PropTypes> = ({ linkedProp, short }) => {
  const intl = useIntl();
  const interval = useDateUpdateInterval();

  const d = new Date(linkedProp.value);

  if (isPastDate(linkedProp)) {
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
          statusMessages.closedTooltip,
          { date: intl.formatDate(d) },
        )}
      />
    );
  }

  const { value, unit } = selectUnit(d, Date.now());

  return (
    <Detail
      icon="exclamation"
      text={(
        <FormattedMessage
          defaultMessage="Due {relativeDate}"
          id="https://app.argu.co/i18n/expireable/states/expiring/label"
          values={{
            relativeDate: (
              <FormattedRelativeTime
                numeric="auto"
                unit={unit}
                updateIntervalInSeconds={filterUpdateInterval(unit, interval)}
                value={value}
              />
            ),
          }}
        />
      )}
      title={intl.formatMessage(
        statusMessages.expiringTooltip,
        { date: intl.formatDate(d) },
      )}
    />
  );
};

ExpiresAt.type = schema.Thing;

ExpiresAt.property = argu.expiresAt;

ExpiresAt.topology = detailsBarTopology;

export default register(ExpiresAt);
