import { linkedPropType, register } from 'link-redux';
import React from 'react';
import emoji from 'react-easy-emoji';
import { defineMessages, useIntl } from 'react-intl';

import { Detail } from '../../../components';
import { NS } from '../../../helpers/LinkedRenderStore';
import { allTopologies } from '../../../topologies';


const messages = defineMessages({
  not_used: {
    defaultMessage: '🚪 GLAPP nog niet gebruikt.',
    id: 'https://app.argu.co/i18n/teamGL/glappNotUsed',
  },
  used: {
    defaultMessage: '🚪 GLAPP laatst gebruikt op {date}.',
    id: 'https://app.argu.co/i18n/teamGL/glappUsedAt',
  },
});

const GlappUsedAt = ({ linkedProp }) => {
  const intl = useIntl();

  const message = linkedProp ? messages.used : messages.not_used;
  const text = emoji(
    intl.formatMessage(message, { date: linkedProp && intl.formatDate(new Date(linkedProp.value)) })
  );

  return <Detail text={text} />;
};

GlappUsedAt.type = NS.teamGL('Volunteer');

GlappUsedAt.property = NS.teamGL('glappUsedAt');

GlappUsedAt.topology = allTopologies;

GlappUsedAt.propTypes = {
  linkedProp: linkedPropType,
};

export default register(GlappUsedAt);
