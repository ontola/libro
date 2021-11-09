import { PropertyProps, register } from 'link-redux';
import React from 'react';
import emoji from 'react-easy-emoji';
import { useIntl } from 'react-intl';

import Detail from '../../../../../components/Detail';
import { tryParseInt } from '../../../../../helpers/numbers';
import teamGL from '../../../../../ontology/teamGL';
import { allTopologies } from '../../../../../topologies';
import { groenlinksMessages } from '../../../lib/messages';

const ACTIVE = 0.2;
const VERY_ACTIVE = 0.6;

const Engagement = ({ linkedProp }: PropertyProps) => {
  const { formatMessage } = useIntl();
  const engagement = tryParseInt(linkedProp);

  let message;

  if (!engagement || engagement < ACTIVE) {
    message = groenlinksMessages.inactive;
  } else if (engagement < VERY_ACTIVE) {
    message = groenlinksMessages.active;
  } else {
    message = groenlinksMessages.veryActive;
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

export default register(Engagement);
