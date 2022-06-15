import * as schema from '@ontologies/schema';
import { Property, register } from 'link-redux';
import React from 'react';

import ontola from '../../../../ontology/ontola';
import { fullResourceTopology } from '../../../../topologies';
import Card from '../../../../topologies/Card';
import Container from '../../../../topologies/Container';

const ConfirmationFull = () => (
  <Container>
    <Card>
      <Property label={ontola.updateAction}>
        <Property
          autoSubmit
          label={schema.target}
        />
      </Property>
    </Card>
  </Container>
);

ConfirmationFull.type = ontola.Confirmation;

ConfirmationFull.topology = fullResourceTopology;

export default register(ConfirmationFull);
