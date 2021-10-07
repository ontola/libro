import { PropertyProps, register } from 'link-redux';
import React from 'react';
import emoji from 'react-easy-emoji';
import { useIntl } from 'react-intl';

import Detail from '../../../../../components/Detail';
import teamGL from '../../../../../ontology/teamGL';
import { allTopologies } from '../../../../../topologies';
import { groenlinksMessages } from '../../../lib/messages';

const GlappUsedAt = ({ linkedProp }: PropertyProps) => {
  const intl = useIntl();

  const message = linkedProp ? groenlinksMessages.used : groenlinksMessages.not_used;
  const text = emoji(
    intl.formatMessage(message, { date: linkedProp && intl.formatDate(new Date(linkedProp.value)) }),
  );

  return <Detail text={text} />;
};

GlappUsedAt.type = teamGL.Volunteer;

GlappUsedAt.property = teamGL.glappUsedAt;

GlappUsedAt.topology = allTopologies;

export default register(GlappUsedAt);
