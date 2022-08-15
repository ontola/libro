import { PropertyProps, register } from 'link-redux';
import React from 'react';
import emoji from 'react-easy-emoji';

import Detail from '../../../../Common/components/Detail';
import { contentDetailsTopology, detailsBarTopology } from '../../../../Common/topologies';
import teamGL from '../../../ontology/teamGL';

const VolunteersCount = ({ linkedProp }: PropertyProps) => (
  <Detail
    text={emoji(`😀 ${linkedProp.value}`)}
    title="Vrijwilligers"
  />
);

VolunteersCount.type = [teamGL.Group, teamGL.Department];

VolunteersCount.property = teamGL.totalVolunteersCount;

VolunteersCount.topology = [
  detailsBarTopology,
  contentDetailsTopology,
];

export default register(VolunteersCount);
