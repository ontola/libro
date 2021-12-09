import * as schema from '@ontologies/schema';
import { SomeNode } from 'link-lib';
import {
  FC,
  Resource,
  register,
} from 'link-redux';
import React from 'react';

import argu from '../../../ontology/argu';
import meeting from '../../../ontology/meeting';
import { cardRowTopology } from '../../../topologies/Card/CardRow';

interface AttatchmentsProps {
  linkedProp: SomeNode;
}

const Attachments: FC<AttatchmentsProps> = ({
  linkedProp,
  children,
}) => (
  <Resource
    wrap
    subject={linkedProp}
  >
    {children}
  </Resource>
);

Attachments.type = schema.Thing;

Attachments.property = [argu.attachments, meeting.attachment];

Attachments.topology = [
  cardRowTopology,
];

export default register(Attachments);
