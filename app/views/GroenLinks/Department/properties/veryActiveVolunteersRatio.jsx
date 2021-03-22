import { linkType, register } from 'link-redux';
import React from 'react';
import emoji from 'react-easy-emoji';

import Detail from '../../../../components/Detail';
import teamGL from '../../../../ontology/teamGL';
import { detailsBarTopology } from '../../../../topologies/DetailsBar';
import { contentDetailsTopology } from '../../../../topologies/ContentDetails';
import { tryParseFloat } from '../../../../helpers/numbers';

const VeryActiveVolunteersRatio = ({ linkedProp }) => (
  <Detail
    text={emoji(`🔥 ${Math.round((tryParseFloat(linkedProp) || 0) * 100)}%`)}
    title="Hyperactief"
  />
);

VeryActiveVolunteersRatio.type = teamGL.Department;

VeryActiveVolunteersRatio.property = teamGL.veryActiveVolunteersRatio;

VeryActiveVolunteersRatio.topology = [
  detailsBarTopology,
  contentDetailsTopology,
];

VeryActiveVolunteersRatio.propTypes = {
  linkedProp: linkType,
};

export default register(VeryActiveVolunteersRatio);
