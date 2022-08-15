import { PropertyProps, register } from 'link-redux';
import React from 'react';
import emoji from 'react-easy-emoji';

import Detail from '../../../../Common/components/Detail';
import { tryParseFloat } from '../../../../Common/lib/numbers';
import { contentDetailsTopology, detailsBarTopology } from '../../../../Common/topologies';
import teamGL from '../../../ontology/teamGL';

const VeryActiveVolunteersRatio = ({ linkedProp }: PropertyProps) => (
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

export default register(VeryActiveVolunteersRatio);
