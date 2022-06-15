import { SomeTerm } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import { FC, register } from 'link-redux';
import React from 'react';
import emoji from 'react-easy-emoji';
import { useIntl } from 'react-intl';

import teamGL from '../../../ontology/teamGL';
import { allTopologies } from '../../../../../topologies';
import Detail, { DetailVariant } from '../../../../Common/components/Detail';
import { groenlinksMessages } from '../../../lib/messages';

interface VolunteerCreatedAtProps {
  linkedProp: SomeTerm;
}

const CreatedAt: FC<VolunteerCreatedAtProps> = ({ linkedProp }) => {
  const { formatMessage } = useIntl();

  const daySpan = 86400000;
  const diff = Math.floor((new Date().getTime() - new Date(linkedProp.value).getTime()) / (daySpan));
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
    variant = DetailVariant.Warning;
  } else {
    message = groenlinksMessages.veryLong;
    variant = DetailVariant.Error;
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

export default register(CreatedAt);
