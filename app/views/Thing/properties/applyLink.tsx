import * as schema from '@ontologies/schema';
import {
  PropertyProps,
  register,
} from 'link-redux';
import React from 'react';

import argu from '../../../ontology/argu';
import { tableRowTopology } from '../../../topologies/TableRow';

const ApplyLink = ({ linkedProp }: PropertyProps) => {
  if (!linkedProp) {
    return null;
  }

  return (
    <input
      readOnly
      value={linkedProp.value}
    />
  );
};

ApplyLink.type = schema.Thing;

ApplyLink.property = [
  argu.applyLink,
  schema.url,
];

ApplyLink.topology = tableRowTopology;

export default register(ApplyLink);
