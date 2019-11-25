import { linkType, register } from 'link-redux';
import React from 'react';
import emoji from 'react-easy-emoji';

import { Detail } from '../../../components';
import teamGL from '../../../ontology/teamGL';
import { detailsBarTopology } from '../../../topologies/DetailsBar';
import { contentDetailsTopology } from '../../../topologies/ContentDetails';

const NewVolunteersCount = ({ linkedProp }) => (
  <Detail
    text={emoji(`👶 ${linkedProp.value}`)}
    title="Nieuwe vrijwilligers"
  />
);

NewVolunteersCount.type = teamGL.Department;

NewVolunteersCount.property = teamGL.newVolunteersCount;

NewVolunteersCount.topology = [
  detailsBarTopology,
  contentDetailsTopology,
];

NewVolunteersCount.propTypes = {
  linkedProp: linkType,
};

export default register(NewVolunteersCount);
