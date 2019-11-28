import { linkType, register } from 'link-redux';
import React from 'react';
import emoji from 'react-easy-emoji';

import { Detail } from '../../../components';
import teamGL from '../../../ontology/teamGL';
import { detailsBarTopology } from '../../../topologies/DetailsBar';
import { contentDetailsTopology } from '../../../topologies/ContentDetails';
import { calcPercentage, tryParseInt } from '../../../helpers/numbers';

const ActiveVolunteersCount = ({ linkedProp, volunteersCount }) => (
  <Detail
    text={emoji(`💪 ${calcPercentage(tryParseInt(linkedProp), tryParseInt(volunteersCount)) || 0}%`)}
    title="Actief"
  />
);

ActiveVolunteersCount.type = teamGL.Department;

ActiveVolunteersCount.property = teamGL.activeVolunteersCount;

ActiveVolunteersCount.topology = [
  detailsBarTopology,
  contentDetailsTopology,
];

ActiveVolunteersCount.mapDataToProps = {
  volunteersCount: teamGL.volunteersCount,
};

ActiveVolunteersCount.propTypes = {
  linkedProp: linkType,
  volunteersCount: linkType,
};

export default register(ActiveVolunteersCount);
