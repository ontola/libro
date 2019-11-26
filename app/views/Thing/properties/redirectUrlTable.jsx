import schema from '@ontologies/schema';
import { isDifferentOrigin } from 'link-lib';
import {
  LinkedResourceContainer,
  linkedPropType,
  register,
} from 'link-redux';
import React from 'react';

import argu from '../../../ontology/argu';
import { tableRowTopology } from '../../../topologies/TableRow';

const RedirectUrlTable = ({ linkedProp }) => {
  if (isDifferentOrigin(linkedProp)) {
    return linkedProp.value;
  }

  return <LinkedResourceContainer subject={linkedProp} />;
};

RedirectUrlTable.type = schema.Thing;

RedirectUrlTable.property = argu.redirectUrl;

RedirectUrlTable.topology = tableRowTopology;

RedirectUrlTable.propTypes = {
  linkedProp: linkedPropType,
};

export default register(RedirectUrlTable);
