import { PropertyProps, register } from 'link-redux';
import React from 'react';
import emoji from 'react-easy-emoji';

import Detail from '../../../../../components/Detail';
import teamGL from '../../../../../ontology/teamGL';
import { contentDetailsTopology, detailsBarTopology } from '../../../../../topologies';

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
