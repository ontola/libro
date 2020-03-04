import { linkType, register } from 'link-redux';
import React from 'react';
import emoji from 'react-easy-emoji';

import Detail from '../../../components/Detail';
import teamGL from '../../../ontology/teamGL';
import { detailsBarTopology } from '../../../topologies/DetailsBar';
import { contentDetailsTopology } from '../../../topologies/ContentDetails';
import { calcPercentage, tryParseInt } from '../../../helpers/numbers';

const InactiveVolunteersCount = ({ linkedProp, volunteersCount }) => (
  <Detail
    text={emoji(`💤 ${calcPercentage(tryParseInt(linkedProp), tryParseInt(volunteersCount)) || 0}%`)}
    title="Inactief"
  />
);

InactiveVolunteersCount.type = teamGL.Department;

InactiveVolunteersCount.property = teamGL.inactiveVolunteersCount;

InactiveVolunteersCount.topology = [
  detailsBarTopology,
  contentDetailsTopology,
];

InactiveVolunteersCount.mapDataToProps = {
  volunteersCount: teamGL.volunteersCount,
};

InactiveVolunteersCount.propTypes = {
  linkedProp: linkType,
  volunteersCount: linkType,
};

export default register(InactiveVolunteersCount);
