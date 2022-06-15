import { PropertyProps, register } from 'link-redux';
import React from 'react';
import emoji from 'react-easy-emoji';

import teamGL from '../../../ontology/teamGL';
import { contentDetailsTopology, detailsBarTopology } from '../../../../../topologies';
import Detail from '../../../../Common/components/Detail';
import { tryParseFloat } from '../../../../Common/lib/numbers';

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
