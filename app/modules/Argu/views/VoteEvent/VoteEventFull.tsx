import {
  FC,
  Type,
  register,
} from 'link-redux';
import React from 'react';

import Container from '../../../Common/topologies/Container';
import { fullResourceTopology } from '../../../Common/topologies/FullResource';
import argu from '../../lib/argu';

const VoteEventFull: FC = () => (
  <Container>
    <Type />
  </Container>
);

VoteEventFull.type = argu.VoteEvent;

VoteEventFull.topology = fullResourceTopology;

export default register(VoteEventFull);
