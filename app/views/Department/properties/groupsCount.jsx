import { linkType, register } from 'link-redux';
import React from 'react';
import emoji from 'react-easy-emoji';

import { Detail } from '../../../components';
import teamGL from '../../../ontology/teamGL';
import { detailsBarTopology } from '../../../topologies/DetailsBar';
import { contentDetailsTopology } from '../../../topologies/ContentDetails';

const GroupsCount = ({ linkedProp }) => (
  <Detail
    text={emoji(`👥 ${linkedProp.value}`)}
    title="Groepen"
  />
);

GroupsCount.type = teamGL.Department;

GroupsCount.property = teamGL.groupsCount;

GroupsCount.topology = [
  detailsBarTopology,
  contentDetailsTopology,
];

GroupsCount.propTypes = {
  linkedProp: linkType,
};

export default register(GroupsCount);
