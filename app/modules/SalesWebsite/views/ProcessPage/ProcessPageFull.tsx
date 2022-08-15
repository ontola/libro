import {
  FC,
  Property,
} from 'link-redux';
import React from 'react';

import { fullResourceTopology } from '../../../Common/topologies';
import Container from '../../../Common/topologies/Container';
import sales from '../../ontology/sales';

const ProcessPageFull: FC = () => (
  <main
    role="main"
  >
    <Property label={sales.header} />
    <Container>
      <Property label={sales.sections} />
    </Container>
    <Property
      label={sales.callToActionBlock}
      trackingId="process-page-full-cta"
    />
  </main>
);

ProcessPageFull.type = sales.ProcessPage;

ProcessPageFull.topology = fullResourceTopology;

export default ProcessPageFull;
