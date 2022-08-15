import * as schema from '@ontologies/schema';
import { Property, register } from 'link-redux';
import React from 'react';

import { fullResourceTopology } from '../../../Common/topologies';
import Card from '../../../Common/topologies/Card';
import Container from '../../../Common/topologies/Container';
import ontola from '../../../Kernel/ontology/ontola';

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
