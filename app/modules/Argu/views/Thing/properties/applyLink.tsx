import * as schema from '@ontologies/schema';
import { PropertyProps, register } from 'link-redux';
import React from 'react';

import { tableRowTopology } from '../../../../Table/topologies';
import argu from '../../../ontology/argu';

const ApplyLink = ({ linkedProp }: PropertyProps) => {
  if (!linkedProp?.value) {
    return null;
  }

  return (
    <React.Fragment>
      {linkedProp.value}
    </React.Fragment>
  );
};

ApplyLink.type = schema.Thing;

ApplyLink.property = [
  argu.applyLink,
  schema.url,
];

ApplyLink.topology = tableRowTopology;

export default register(ApplyLink);
