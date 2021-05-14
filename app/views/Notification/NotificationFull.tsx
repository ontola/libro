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

interface NoificationFullProps {
  renderPartOf?: boolean;
}

const NotificationFull: FC<NoificationFullProps> = ({
  renderPartOf,
}) => (
  <Container>
    {renderPartOf && <Property label={schema.isPartOf} />}
    <Type />
  </Container>
);

NotificationFull.type = argu.Notification;

NotificationFull.topology = fullResourceTopology;

export default register(NotificationFull);
