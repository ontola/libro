import * as schema from '@ontologies/schema';
import { linkedPropType, register } from 'link-redux';
import React from 'react';

import argu from '../../../ontology/argu';
import { tableRowTopology } from '../../../topologies/TableRow';

const ApplyLink = ({ linkedProp }) => {
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

ApplyLink.propTypes = {
  linkedProp: linkedPropType,
};

export default register(ApplyLink);
