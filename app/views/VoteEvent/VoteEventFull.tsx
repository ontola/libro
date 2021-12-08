import {
  FC,
  Type,
  register,
} from 'link-redux';
import React from 'react';

import argu from '../../ontology/argu';
import Container from '../../topologies/Container';
import { fullResourceTopology } from '../../topologies/FullResource';

const VoteEventFull: FC = () => (
  <Container>
    <Type />
  </Container>
);

VoteEventFull.type = argu.VoteEvent;

VoteEventFull.topology = fullResourceTopology;

export default register(VoteEventFull);
