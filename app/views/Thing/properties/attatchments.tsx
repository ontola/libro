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
import { mainBodyTopology } from '../../../topologies/MainBody';

interface AttatchmentsProps {
  linkedProp: SomeNode;
}

const Attatchments: FC<AttatchmentsProps> = ({
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

Attatchments.type = schema.Thing;

Attatchments.property = [argu.attachments, meeting.attachment];

Attatchments.topology = [
  cardRowTopology,
  mainBodyTopology,
];

export default register(Attatchments);
