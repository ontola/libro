import { linkedPropType, register } from 'link-redux';
import React from 'react';
import emoji from 'react-easy-emoji';
import { useIntl } from 'react-intl';

import Detail from '../../../../components/Detail';
import teamGL from '../../../../ontology/teamGL';
import { allTopologies } from '../../../../topologies';
import { groenlinksMessages } from '../../../../translations/groenlinks';

const propTypes = {
  linkedProp: linkedPropType,
};

const Engagement = ({ linkedProp }) => {
  const { formatMessage } = useIntl();

  const active = 0.2;
  const veryActive = 0.6;
  let message;

  if (linkedProp.value < active) {
    message = groenlinksMessages.inactive;
  } else if (linkedProp.value < veryActive) {
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

Engagement.propTypes = propTypes;

export default register(Engagement);
