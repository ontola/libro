import {
  FC,
  Property,
  register,
} from 'link-redux';
import React from 'react';

import argu from '../../ontology/argu';
import { allTopologies } from '../../../../topologies';

const LinkedRecord: FC = () => <Property label={argu.linkedRecord} />;

LinkedRecord.type = argu.LinkedRecord;

LinkedRecord.topology = allTopologies;

export default [
  register(LinkedRecord),
];
