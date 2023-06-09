import {
  FC,
  Resource,
  register,
} from 'link-redux';
import React from 'react';

import { fullResourceTopology } from '../../../Common/topologies';
import datacube from '../../ontology/datacube';
import { Size } from '../../../Kernel/lib/themes';
import Container from '../../../Common/topologies/Container';

const DataSetFull: FC = ({ subject }) => (
  <Container size={Size.Large}>
    <Resource subject={subject} />
  </Container>
);

DataSetFull.type = datacube.DataSet;

DataSetFull.topology = fullResourceTopology;

export default register(DataSetFull);
