import LinkedRenderStore from 'link-lib';
import { linkedPropType } from 'link-redux';
import React from 'react';
import emoji from 'react-easy-emoji';
import {
  defineMessages,
  injectIntl,
  intlShape,
} from 'react-intl';

import { NS } from '../../../helpers/LinkedRenderStore';
import { allTopologies } from '../../../topologies';
import { Detail } from '../../../components';

const propTypes = {
  intl: intlShape,
  linkedProp: linkedPropType,
};

const messages = defineMessages({
  long: {
    defaultMessage: '🤔 Wacht al {diff} dagen',
    id: 'https://team.groenlinks.nl/i18n/waiting/long',
  },
  short: {
    defaultMessage: '😀 Wacht enkele dagen',
    id: 'https://team.groenlinks.nl/i18n/waiting/short',
  },
  veryLong: {
    defaultMessage: '😱 Wacht al {diff} dagen',
    id: 'https://team.groenlinks.nl/i18n/waiting/veryLong',
  },
  veryShort: {
    defaultMessage: '😬 Net aangemeld',
    id: 'https://team.groenlinks.nl/i18n/waiting/veryShort',
  },
});


const CreatedAt = ({ intl: { formatMessage }, linkedProp }) => {
  const daySpan = 86400000;
  const diff = Math.floor((new Date() - new Date(linkedProp.value)) / (daySpan));
  const waitingVeryShort = 3;
  const waitingShort = 7;
  const waitingLong = 21;
  let message, variant;

  if (diff <= waitingVeryShort) {
    message = messages.veryShort;
  } else if (diff <= waitingShort) {
    message = messages.short;
  } else if (diff <= waitingLong) {
    message = messages.long;
    variant = 'warning';
  } else {
    message = messages.veryLong;
    variant = 'error';
  }

  return <Detail text={emoji(formatMessage(message, { diff }))} variant={variant} />;
};

CreatedAt.propTypes = propTypes;

export default LinkedRenderStore.registerRenderer(
  injectIntl(CreatedAt),
  NS.teamGL('NewVolunteer'),
  NS.schema('dateCreated'),
  allTopologies
);
