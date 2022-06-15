import * as rdfs from '@ontologies/rdfs';
import { FC, register } from 'link-redux';
import React from 'react';

import { detailsBarTopology } from '../../../../topologies';
import LDDetail from '../../../Common/components/LDDetail';

const RDFSClassDetailsBar: FC = () => (
  <LDDetail />
);

RDFSClassDetailsBar.type = rdfs.Class;

RDFSClassDetailsBar.topology = detailsBarTopology;

export default register(RDFSClassDetailsBar);
