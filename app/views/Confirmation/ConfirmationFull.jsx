import schema from '@ontologies/schema';
import {
  Property,
  register,
} from 'link-redux';
import React from 'react';

import argu from '../../ontology/argu';
import ontola from '../../ontology/ontola';
import Card from '../../topologies/Card';
import Container from '../../topologies/Container';
import { fullResourceTopology } from '../../topologies/FullResource';

const ConfirmationFull = () => (
  <Container>
    <Card>
      <Property autoSubmit label={schema.target} />
    </Card>
  </Container>
);

ConfirmationFull.type = [
  argu.Confirmation,
  ontola.Confirmation,
];

ConfirmationFull.topology = fullResourceTopology;

export default register(ConfirmationFull);
