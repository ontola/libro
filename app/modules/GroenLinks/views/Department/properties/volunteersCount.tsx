import { PropertyProps, register } from 'link-redux';
import React from 'react';
import emoji from 'react-easy-emoji';

import Detail from '../../../../../components/Detail';
import teamGL from '../../../../../ontology/teamGL';
import { contentDetailsTopology, detailsBarTopology } from '../../../../../topologies';

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
