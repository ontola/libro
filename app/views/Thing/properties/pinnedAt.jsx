import schema from '@ontologies/schema';
import { linkedPropType, register } from 'link-redux';
import React from 'react';
import { defineMessages, useIntl } from 'react-intl';

import Detail from '../../../components/Detail';
import argu from '../../../ontology/argu';
import { detailsBarTopology } from '../../../topologies/DetailsBar';

const messages = defineMessages({
  pinnedAtLabel: {
    defaultMessage: 'Pinned at {date}',
    id: 'https://app.argu.co/i18n/pinnable/states/pinned/pinnedAtLabel',
  },
});

const PinnedAt = ({ linkedProp }) => {
  const { formatDate, formatMessage } = useIntl();

  return (
    <Detail
      icon="thumb-tack"
      title={formatMessage(
        messages.pinnedAtLabel,
        {
          date: formatDate(
            new Date(linkedProp.value),
            {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            }
          ),
        }
      )}
    />
  );
};

PinnedAt.type = schema.Thing;

PinnedAt.property = argu.ns('pinnedAt');

PinnedAt.topology = detailsBarTopology;

PinnedAt.propTypes = {
  linkedProp: linkedPropType,
};

export default register(PinnedAt);
