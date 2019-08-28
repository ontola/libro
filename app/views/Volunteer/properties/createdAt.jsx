import { linkedPropType, register } from 'link-redux';
import React from 'react';
import emoji from 'react-easy-emoji';
import {
  defineMessages,
  useIntl,
} from 'react-intl';

import { NS } from '../../../helpers/LinkedRenderStore';
import { allTopologies } from '../../../topologies';
import { Detail } from '../../../components';

const propTypes = {
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

const CreatedAt = ({ linkedProp }) => {
  const { formatMessage } = useIntl();

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

  return (
    <Detail
      text={emoji(formatMessage(message, { diff }))}
      title={linkedProp.value.split('T').shift()}
      variant={variant}
    />
  );
};

CreatedAt.type = NS.teamGL('NewVolunteer');

CreatedAt.property = NS.schema('dateCreated');

CreatedAt.topology = allTopologies;

CreatedAt.propTypes = propTypes;

export default register(CreatedAt);
