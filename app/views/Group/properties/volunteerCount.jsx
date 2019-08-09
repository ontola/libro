import { linkType, register } from 'link-redux';
import React from 'react';
import {
  defineMessages,
  useIntl,
} from 'react-intl';

import { NS } from '../../../helpers/LinkedRenderStore';
import { detailsBarTopology } from '../../../topologies/DetailsBar';
import { contentDetailsTopology } from '../../../topologies/ContentDetails';
import { Detail } from '../../../components';

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

VolunteerCountDetailsBar.type = NS.teamGL('Group');

VolunteerCountDetailsBar.property = NS.teamGL('volunteerCount');

VolunteerCountDetailsBar.topology = [
  detailsBarTopology,
  contentDetailsTopology,
];

VolunteerCountDetailsBar.propTypes = {
  linkedProp: linkType,
};

export default register(VolunteerCountDetailsBar);
