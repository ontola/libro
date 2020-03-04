import { linkType, register } from 'link-redux';
import React from 'react';
import {
  defineMessages,
  useIntl,
} from 'react-intl';

import Detail from '../../../components/Detail';
import teamGL from '../../../ontology/teamGL';
import { detailsBarTopology } from '../../../topologies/DetailsBar';
import { contentDetailsTopology } from '../../../topologies/ContentDetails';

const messages = defineMessages({
  volunteerCount: {
    defaultMessage: '{volunteerCount, number} {volunteerCount, plural, one {vrijwilliger} other {vrijwilligers}}',
    id: 'https://app.argu.co/i18n/teamGL/volunteersCount',
  },
});

const VolunteerCountDetailsBar = ({ linkedProp }) => {
  const { formatMessage } = useIntl();

  return (
    <Detail text={formatMessage(messages.volunteerCount, { volunteerCount: linkedProp.value })} />
  );
};

VolunteerCountDetailsBar.type = teamGL.Group;

VolunteerCountDetailsBar.property = teamGL.volunteersCount;

VolunteerCountDetailsBar.topology = [
  detailsBarTopology,
  contentDetailsTopology,
];

VolunteerCountDetailsBar.propTypes = {
  linkedProp: linkType,
};

export default register(VolunteerCountDetailsBar);
