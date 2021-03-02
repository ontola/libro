import { linkedPropType, register } from 'link-redux';
import React from 'react';
import emoji from 'react-easy-emoji';
import {
  defineMessages,
  useIntl,
} from 'react-intl';

import Detail from '../../../../components/Detail';
import teamGL from '../../../../ontology/teamGL';
import { allTopologies } from '../../../../topologies';

const propTypes = {
  linkedProp: linkedPropType,
};

const messages = defineMessages({
  active: {
    defaultMessage: '💪 actief',
    id: 'https://team.groenlinks.nl/i18n/engagement/active',
  },
  inactive: {
    defaultMessage: '💤 inactief',
    id: 'https://team.groenlinks.nl/i18n/engagement/inactive',
  },
  veryActive: {
    defaultMessage: '🔥 hyperactief',
    id: 'https://team.groenlinks.nl/i18n/engagement/veryActive',
  },
});

const Engagement = ({ linkedProp }) => {
  const { formatMessage } = useIntl();

  const active = 0.2;
  const veryActive = 0.6;
  let message;

  if (linkedProp.value < active) {
    message = messages.inactive;
  } else if (linkedProp.value < veryActive) {
    message = messages.active;
  } else {
    message = messages.veryActive;
  }

  return (
    <Detail
      text={emoji(formatMessage(message))}
    />
  );
};

Engagement.type = [teamGL.Volunteer, teamGL.Participant];

Engagement.property = teamGL.engagement;

Engagement.topology = allTopologies;

Engagement.propTypes = propTypes;

export default register(Engagement);
