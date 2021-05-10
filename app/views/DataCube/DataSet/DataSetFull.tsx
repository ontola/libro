import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  Resource,
  register,
} from 'link-redux';
import React from 'react';

import { Size } from '../../../components/shared/config';
import qb from '../../../ontology/qb';
import Container from '../../../topologies/Container';
import { fullResourceTopology } from '../../../topologies/FullResource';

const DataSetFull: FC = ({ subject }) => (
  <Container size={Size.Large}>
    <Property label={schema.isPartOf} />
    <Resource subject={subject} />
  </Container>
);

DataSetFull.type = qb.DataSet;

DataSetFull.topology = fullResourceTopology;

export default register(DataSetFull);
