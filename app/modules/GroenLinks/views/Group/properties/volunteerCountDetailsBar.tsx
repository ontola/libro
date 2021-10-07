import {
  PropertyProps,
  register,
} from 'link-redux';
import React from 'react';
import { useIntl } from 'react-intl';

import Detail from '../../../../../components/Detail';
import teamGL from '../../../../../ontology/teamGL';
import { detailsBarTopology } from '../../../../../topologies/DetailsBar';
import { contentDetailsTopology } from '../../../../../topologies/ContentDetails';
import { groenlinksMessages } from '../../../lib/messages';

const VolunteerCountDetailsBar = ({ linkedProp }: PropertyProps) => {
  const { formatMessage } = useIntl();

  return (
    <Detail text={formatMessage(groenlinksMessages.volunteerCount, { volunteerCount: linkedProp.value })} />
  );
};

VolunteerCountDetailsBar.type = teamGL.Group;

VolunteerCountDetailsBar.property = teamGL.volunteersCount;

VolunteerCountDetailsBar.topology = [
  detailsBarTopology,
  contentDetailsTopology,
];

export default register(VolunteerCountDetailsBar);
