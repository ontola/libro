import { register } from 'link-redux';
import React from 'react';

import ll from '../../ontology/ll';
import Container from '../../topologies/Container';
import { fullResourceTopology } from '../../topologies/FullResource';
import { tabPaneTopology } from '../../topologies/TabPane';

import { ErrorCard } from './ErrorCard';

const ErrorFull = (props) => (
  <Container>
    <ErrorCard {...props} />
  </Container>
);

ErrorFull.type = ll.ErrorResource;

ErrorFull.topology = [
  fullResourceTopology,
  tabPaneTopology,
];

export default register(ErrorFull);
