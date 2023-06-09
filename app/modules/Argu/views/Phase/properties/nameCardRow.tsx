import * as schema from '@ontologies/schema';
import {
  FC,
  PropertyProps,
  register,
} from 'link-redux';
import React from 'react';

import { cardRowTopology } from '../../../../Common/topologies';
import argu from '../../../ontology/argu';

const PhaseNameCardRow: FC<PropertyProps> = ({ linkedProp }) => (
  <span>
    {linkedProp.value}
  </span>
);

PhaseNameCardRow.type = argu.Phase;

PhaseNameCardRow.property = schema.name;

PhaseNameCardRow.topology = cardRowTopology;

export default register(PhaseNameCardRow);
