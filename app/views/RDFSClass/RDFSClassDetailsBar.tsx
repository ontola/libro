import * as rdfs from '@ontologies/rdfs';
import { FC, register } from 'link-redux';
import React from 'react';

import LDDetail from '../../components/LDDetail';
import { detailsBarTopology } from '../../topologies/DetailsBar';

const RDFSClassDetailsBar: FC = () => (
  <LDDetail />
);

RDFSClassDetailsBar.type = rdfs.Class;

RDFSClassDetailsBar.topology = detailsBarTopology;

export default register(RDFSClassDetailsBar);
