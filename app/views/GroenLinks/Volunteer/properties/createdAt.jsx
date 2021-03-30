import * as schema from '@ontologies/schema';
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

const CreatedAt = ({ linkedProp }) => {
  const { formatMessage } = useIntl();

  const daySpan = 86400000;
  const diff = Math.floor((new Date() - new Date(linkedProp.value)) / (daySpan));
  const waitingVeryShort = 3;
  const waitingShort = 7;
  const waitingLong = 21;
  let message; let variant;

  if (diff <= waitingVeryShort) {
    message = groenlinksMessages.veryShort;
  } else if (diff <= waitingShort) {
    message = groenlinksMessages.short;
  } else if (diff <= waitingLong) {
    message = groenlinksMessages.long;
    variant = 'warning';
  } else {
    message = groenlinksMessages.veryLong;
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

CreatedAt.type = teamGL.NewVolunteer;

CreatedAt.property = schema.dateCreated;

CreatedAt.topology = allTopologies;

CreatedAt.propTypes = propTypes;

export default register(CreatedAt);
