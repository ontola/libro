import { PropertyProps, register } from 'link-redux';
import React from 'react';
import { useIntl } from 'react-intl';

import Detail from '../../../../Common/components/Detail';
import { contentDetailsTopology } from '../../../../Common/topologies/ContentDetails';
import { detailsBarTopology } from '../../../../Common/topologies/DetailsBar';
import { groenlinksMessages } from '../../../lib/messages';
import teamGL from '../../../ontology/teamGL';

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
