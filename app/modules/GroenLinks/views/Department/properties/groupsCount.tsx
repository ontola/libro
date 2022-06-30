import { PropertyProps, register } from 'link-redux';
import React from 'react';
import emoji from 'react-easy-emoji';

import Detail from '../../../../Common/components/Detail';
import { contentDetailsTopology } from '../../../../Common/topologies/ContentDetails';
import { detailsBarTopology } from '../../../../Common/topologies/DetailsBar';
import teamGL from '../../../ontology/teamGL';

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
