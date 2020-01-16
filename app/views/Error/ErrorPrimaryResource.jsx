import { register } from 'link-redux';
import React from 'react';

import ll from '../../ontology/ll';
import Container from '../../topologies/Container';
import { primaryResourceTopology } from '../../topologies/PrimaryResource';
import { tabPaneTopology } from '../../topologies/TabPane';

import { ErrorCard } from './ErrorCard';

const ErrorPrimaryResource = (props) => (
  <Container>
    <ErrorCard {...props} />
  </Container>
);

ErrorPrimaryResource.type = ll.ErrorResource;

ErrorPrimaryResource.topology = [
  primaryResourceTopology,
  tabPaneTopology,
];

export default register(ErrorPrimaryResource);
