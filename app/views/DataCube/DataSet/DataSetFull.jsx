import * as schema from '@ontologies/schema';
import {
  Property,
  Resource,
  subjectType,
} from 'link-redux';
import React from 'react';

import qb from '../../../ontology/qb';
import CardMain from '../../../topologies/Card/CardMain';
import Container from '../../../topologies/Container';
import { fullResourceTopology } from '../../../topologies/FullResource';

const DataSetFull = ({ subject }) => (
  <Container size="large">
    <Property label={schema.isPartOf} />
    <CardMain>
      <Resource subject={subject} />
    </CardMain>
  </Container>
);

DataSetFull.type = qb.DataSet;

DataSetFull.topology = fullResourceTopology;

DataSetFull.propTypes = {
  subject: subjectType,
};

export default DataSetFull;
