import { linkType, register } from 'link-redux';
import React from 'react';
import emoji from 'react-easy-emoji';

import Detail from '../../../../components/Detail';
import teamGL from '../../../../ontology/teamGL';
import { detailsBarTopology } from '../../../../topologies/DetailsBar';
import { contentDetailsTopology } from '../../../../topologies/ContentDetails';

const VolunteersCount = ({ linkedProp }) => (
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

VolunteersCount.propTypes = {
  linkedProp: linkType,
};

export default register(VolunteersCount);
