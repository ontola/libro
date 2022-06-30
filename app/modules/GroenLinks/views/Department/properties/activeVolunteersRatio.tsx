import { PropertyProps, register } from 'link-redux';
import React from 'react';
import emoji from 'react-easy-emoji';

import Detail from '../../../../Common/components/Detail';
import { tryParseFloat } from '../../../../Common/lib/numbers';
import { contentDetailsTopology } from '../../../../Common/topologies/ContentDetails';
import { detailsBarTopology } from '../../../../Common/topologies/DetailsBar';
import teamGL from '../../../ontology/teamGL';

const ActiveVolunteersRatio = ({ linkedProp }: PropertyProps) => (
  <Detail
    text={emoji(`💪 ${Math.round((tryParseFloat(linkedProp) || 0) * 100)}%`)}
    title="Actief"
  />
);

ActiveVolunteersRatio.type = teamGL.Department;

ActiveVolunteersRatio.property = teamGL.activeVolunteersRatio;

ActiveVolunteersRatio.topology = [
  detailsBarTopology,
  contentDetailsTopology,
];

export default register(ActiveVolunteersRatio);
