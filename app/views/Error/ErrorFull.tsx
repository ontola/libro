import {
  FC,
  Resource,
  register,
} from 'link-redux';
import React from 'react';

import ll from '../../ontology/ll';
import Container from '../../topologies/Container';
import { fullResourceTopology } from '../../topologies/FullResource';
import { tabPaneTopology } from '../../topologies/TabPane';

import { ErrorComponentProps } from './helpers';


const ErrorFull: FC<ErrorComponentProps> = (props) => (
  <Container>
    <Resource subject={props.subject} />
  </Container>
);

ErrorFull.type = ll.ErrorResource;

ErrorFull.topology = [
  fullResourceTopology,
  tabPaneTopology,
];

export default register(ErrorFull);
