import {
  FC,
  Type,
  register,
} from 'link-redux';
import React from 'react';

import argu from '../../ontology/argu';
import Container from '../../topologies/Container';
import { fullResourceTopology } from '../../topologies/FullResource';

const NotificationFull: FC = () => (
  <Container>
    <Type />
  </Container>
);

NotificationFull.type = argu.Notification;

NotificationFull.topology = fullResourceTopology;

export default register(NotificationFull);
