import LinkedRenderStore from 'link-lib';
import { linkedPropType } from 'link-redux';
import React from 'react';
import emoji from 'react-easy-emoji';
import { FormattedMessage } from 'react-intl';

import { NS } from '../../../helpers/LinkedRenderStore';
import { allTopologies } from '../../../topologies';
import { Detail } from '../../../components';

const propTypes = {
  linkedProp: linkedPropType,
};

const CreatedAt = ({ linkedProp }) => {
  const daySpan = 86400000;
  const diff = Math.floor((new Date() - new Date(linkedProp.value)) / (daySpan));
  const waitingVeryShort = 3;
  const waitingShort = 7;
  const waitingLong = 21;
  let message;

  if (diff <= waitingVeryShort) {
    message = (
      <FormattedMessage
        defaultMessage="😬 Net aangemeld"
        id="https://team.groenlinks.nl/i18n/waiting/veryShort"
      />
    );
  } else if (diff <= waitingShort) {
    message = (
      <FormattedMessage
        defaultMessage="😀 Wacht enkele dagen"
        id="https://team.groenlinks.nl/i18n/waiting/short"
      />
    );
  } else if (diff <= waitingLong) {
    message = (
      <FormattedMessage
        defaultMessage="🤔 Wacht al {diff} dagen"
        id="https://team.groenlinks.nl/i18n/waiting/long"
        values={{ diff }}
      />
    );
  } else {
    message = (
      <FormattedMessage
        defaultMessage="😱 Wacht al {diff} dagen"
        id="https://team.groenlinks.nl/i18n/waiting/veryLong"
        values={{ diff }}
      />
    );
  }
  return <Detail text={emoji(message)} />;
};

CreatedAt.propTypes = propTypes;

export default LinkedRenderStore.registerRenderer(
  CreatedAt,
  NS.teamGL('NewVolunteer'),
  NS.schema('dateCreated'),
  allTopologies
);
