import { PropertyProps, register } from 'link-redux';
import React from 'react';
import emoji from 'react-easy-emoji';

import Detail from '../../../../../components/Detail';
import teamGL from '../../../../../ontology/teamGL';
import { contentDetailsTopology, detailsBarTopology } from '../../../../../topologies';

const NewVolunteersCount = ({ linkedProp }: PropertyProps) => (
  <Detail
    text={emoji(`👶 ${linkedProp.value}`)}
    title="Nieuwe vrijwilligers"
  />
);

NewVolunteersCount.type = teamGL.Department;

NewVolunteersCount.property = teamGL.totalNewVolunteersCount;

NewVolunteersCount.topology = [
  detailsBarTopology,
  contentDetailsTopology,
];

export default register(NewVolunteersCount);
