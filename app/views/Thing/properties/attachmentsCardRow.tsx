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
import { cardRowTopology } from '../../../topologies';

interface AttatchmentsProps {
  linkedProp: SomeNode;
}

const AttachmentsCardRow: FC<AttatchmentsProps> = ({
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

AttachmentsCardRow.type = schema.Thing;

AttachmentsCardRow.property = [argu.attachments, meeting.attachment];

AttachmentsCardRow.topology = cardRowTopology;

export default register(AttachmentsCardRow);
