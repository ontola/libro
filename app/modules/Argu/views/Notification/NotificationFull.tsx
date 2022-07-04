import {
  FC,
  Type,
  register,
} from 'link-redux';
import React from 'react';

import Container from '../../../Common/topologies/Container';
import { fullResourceTopology } from '../../../Common/topologies/FullResource';
import argu from '../../ontology/argu';

const NotificationFull: FC = () => (
  <Container>
    <Type />
  </Container>
);

NotificationFull.type = argu.Notification;

NotificationFull.topology = fullResourceTopology;

export default register(NotificationFull);
