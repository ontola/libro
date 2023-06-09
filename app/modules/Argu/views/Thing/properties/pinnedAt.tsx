import * as schema from '@ontologies/schema';
import { PropertyProps, register } from 'link-redux';
import React from 'react';
import { useIntl } from 'react-intl';

import { statusMessages } from '../../../../../translations/messages';
import Detail from '../../../../Common/components/Detail';
import { detailsBarTopology } from '../../../../Common/topologies';
import argu from '../../../ontology/argu';

const PinnedAt = ({ linkedProp }: PropertyProps): JSX.Element => {
  const { formatDate, formatMessage } = useIntl();

  return (
    <Detail
      icon="thumb-tack"
      title={formatMessage(
        statusMessages.pinnedAtLabel,
        {
          date: formatDate(
            new Date(linkedProp.value),
            {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            },
          ),
        },
      )}
    />
  );
};

PinnedAt.type = schema.Thing;

PinnedAt.property = argu.pinnedAt;

PinnedAt.topology = detailsBarTopology;

export default register(PinnedAt);
