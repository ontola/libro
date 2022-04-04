import * as schema from '@ontologies/schema';
import {
  FC,
  PropertyProps,
  register,
} from 'link-redux';
import React from 'react';

import argu from '../../../ontology/argu';
import { cardRowTopology } from '../../../topologies';

const PhaseNameCardRow: FC<PropertyProps> = ({ linkedProp }) => (
  <span>
    {linkedProp.value}
  </span>
);

PhaseNameCardRow.type = argu.Phase;

PhaseNameCardRow.property = schema.name;

PhaseNameCardRow.topology = cardRowTopology;

export default register(PhaseNameCardRow);
