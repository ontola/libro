import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  Type,
  register,
} from 'link-redux';
import React from 'react';

import argu from '../../ontology/argu';
import Container from '../../topologies/Container';
import { fullResourceTopology } from '../../topologies/FullResource';

interface VoteEventFullProps {
  renderPartOf?: boolean;
}

const VoteEventFull: FC<VoteEventFullProps> = ({
  renderPartOf,
}) => (
  <Container>
    {renderPartOf && <Property label={schema.isPartOf} />}
    <Type />
  </Container>
);

VoteEventFull.type = argu.VoteEvent;

VoteEventFull.topology = fullResourceTopology;

export default register(VoteEventFull);
