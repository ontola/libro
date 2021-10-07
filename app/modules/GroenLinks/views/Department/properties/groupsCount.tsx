import { PropertyProps, register } from 'link-redux';
import React from 'react';
import emoji from 'react-easy-emoji';

import Detail from '../../../../../components/Detail';
import teamGL from '../../../../../ontology/teamGL';
import { detailsBarTopology } from '../../../../../topologies/DetailsBar';
import { contentDetailsTopology } from '../../../../../topologies/ContentDetails';

const GroupsCount = ({ linkedProp }: PropertyProps) => (
  <Detail
    text={emoji(`👥 ${linkedProp.value}`)}
    title="Groepen"
  />
);

GroupsCount.type = teamGL.Department;

GroupsCount.property = teamGL.totalGroupsCount;

GroupsCount.topology = [
  detailsBarTopology,
  contentDetailsTopology,
];

export default register(GroupsCount);
