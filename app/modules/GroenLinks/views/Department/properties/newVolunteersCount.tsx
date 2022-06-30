import { PropertyProps, register } from 'link-redux';
import React from 'react';
import emoji from 'react-easy-emoji';

import Detail from '../../../../Common/components/Detail';
import { contentDetailsTopology } from '../../../../Common/topologies/ContentDetails';
import { detailsBarTopology } from '../../../../Common/topologies/DetailsBar';
import teamGL from '../../../ontology/teamGL';

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
