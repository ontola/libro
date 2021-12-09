import * as schema from '@ontologies/schema';
import {
  FC,
  Property,
  PropertyProps,
  register,
} from 'link-redux';
import React from 'react';

import argu from '../../../ontology/argu';
import meeting from '../../../ontology/meeting';
import List from '../../../topologies/List';
import { mainBodyTopology } from '../../../topologies/MainBody';

const Attachments: FC<PropertyProps> = () => (
  <List>
    <Property
      label={argu.attachments}
      onLoad={() => null}
    />
    <Property
      label={meeting.attachment}
      onLoad={() => null}
    />
  </List>
);

Attachments.type = schema.Thing;

Attachments.property = [argu.attachments, meeting.attachment];

Attachments.topology = [
  mainBodyTopology,
];

export default register(Attachments);
