import {
  FC,
  Resource,
  register,
} from 'link-redux';
import React from 'react';

import { ErrorComponentProps } from '../../components/Error/helpers';
import { ERROR_CLASSES } from '../../helpers/metaData';
import Container from '../../topologies/Container';
import { fullResourceTopology } from '../../topologies/FullResource';
import { tabPaneTopology } from '../../topologies/TabPane';

const ErrorFull: FC<ErrorComponentProps> = (props) => (
  <Container>
    <Resource subject={props.subject} />
  </Container>
);

ErrorFull.type = ERROR_CLASSES;

ErrorFull.topology = [
  fullResourceTopology,
  tabPaneTopology,
];

export default register(ErrorFull);
