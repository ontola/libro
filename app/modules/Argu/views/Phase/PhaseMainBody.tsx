import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
} from 'link-redux';
import React from 'react';

import argu from '../../ontology/argu';
import { mainBodyTopology } from '../../../../topologies';

const PhaseMainBody: FC = () => <Property label={schema.text} />;

PhaseMainBody.type = argu.Phase;

PhaseMainBody.topology = mainBodyTopology;

export default register(PhaseMainBody);
