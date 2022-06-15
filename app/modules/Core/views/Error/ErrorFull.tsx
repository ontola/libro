import {
  FC,
  Resource,
  register, 
} from 'link-redux';
import React from 'react';

import { fullResourceTopology, tabPaneTopology } from '../../../../topologies';
import Container from '../../../../topologies/Container';
import { ErrorComponentProps } from '../../../Common/components/Error/helpers';
import { ERROR_CLASSES } from '../../../Common/lib/metaData';

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
