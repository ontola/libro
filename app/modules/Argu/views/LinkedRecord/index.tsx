import {
  FC,
  Property,
  register,
} from 'link-redux';
import React from 'react';

import { allTopologies } from '../../../../topologies';
import argu from '../../ontology/argu';

const LinkedRecord: FC = () => <Property label={argu.linkedRecord} />;

LinkedRecord.type = argu.LinkedRecord;

LinkedRecord.topology = allTopologies;

export default register(LinkedRecord);
