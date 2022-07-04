import {
  FC,
  Resource,
  register,
} from 'link-redux';
import React from 'react';

import qb from '../../../../../ontology/qb';
import { Size } from '../../../../Common/theme/types';
import Container from '../../../../Common/topologies/Container';
import { fullResourceTopology } from '../../../../Common/topologies/FullResource';

const DataSetFull: FC = ({ subject }) => (
  <Container size={Size.Large}>
    <Resource subject={subject} />
  </Container>
);

DataSetFull.type = qb.DataSet;

DataSetFull.topology = fullResourceTopology;

export default register(DataSetFull);
