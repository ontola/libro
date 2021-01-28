import * as schema from '@ontologies/schema';
import {
  linkedPropType,
  register,
} from 'link-redux';
import React from 'react';

import Link from '../../../components/Link';
import ontola from '../../../ontology/ontola';
import { tableRowTopology } from '../../../topologies/TableRow';

const RedirectUrlTable = ({ linkedProp }) => {
  if (!linkedProp) {
    return null;
  }

  return (
    <Link to={linkedProp.value}>
      {linkedProp.value}
    </Link>
  );
};

RedirectUrlTable.type = schema.Thing;

RedirectUrlTable.property = [ontola.redirectUrl, ontola.href];

RedirectUrlTable.topology = tableRowTopology;

RedirectUrlTable.propTypes = {
  linkedProp: linkedPropType,
};

export default register(RedirectUrlTable);
