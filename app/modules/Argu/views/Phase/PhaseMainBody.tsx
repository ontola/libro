import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  register,
} from 'link-redux';
import React from 'react';

import { mainBodyTopology } from '../../../Common/topologies/MainBody';
import argu from '../../ontology/argu';

const PhaseMainBody: FC = () => <Property label={schema.text} />;

PhaseMainBody.type = argu.Phase;

PhaseMainBody.topology = mainBodyTopology;

export default register(PhaseMainBody);
