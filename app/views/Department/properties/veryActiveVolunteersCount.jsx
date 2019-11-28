import { linkType, register } from 'link-redux';
import React from 'react';
import emoji from 'react-easy-emoji';

import { Detail } from '../../../components';
import teamGL from '../../../ontology/teamGL';
import { detailsBarTopology } from '../../../topologies/DetailsBar';
import { contentDetailsTopology } from '../../../topologies/ContentDetails';
import { calcPercentage, tryParseInt } from '../../../helpers/numbers';

const VeryActiveVolunteersCount = ({ linkedProp, volunteersCount }) => (
  <Detail
    text={emoji(`🔥 ${calcPercentage(tryParseInt(linkedProp), tryParseInt(volunteersCount)) || 0}%`)}
    title="Hyperactief"
  />
);

VeryActiveVolunteersCount.type = teamGL.Department;

VeryActiveVolunteersCount.property = teamGL.veryActiveVolunteersCount;

VeryActiveVolunteersCount.topology = [
  detailsBarTopology,
  contentDetailsTopology,
];

VeryActiveVolunteersCount.mapDataToProps = {
  volunteersCount: teamGL.volunteersCount,
};

VeryActiveVolunteersCount.propTypes = {
  linkedProp: linkType,
  volunteersCount: linkType,
};

export default register(VeryActiveVolunteersCount);
