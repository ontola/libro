import * as schema from '@ontologies/schema';
import { PropertyProps, register } from 'link-redux';
import React from 'react';

import Link from '../../../../Common/components/Link';
import ontola from '../../../../Kernel/ontology/ontola';
import { tableRowTopology } from '../../../../Table/topologies';

const RedirectUrlTable = ({ linkedProp }: PropertyProps): JSX.Element | null => {
  if (!linkedProp) {
    return null;
  }

  return (
    <Link
      allowExternal={false}
      to={linkedProp.value}
    >
      {linkedProp.value}
    </Link>
  );
};

RedirectUrlTable.type = schema.Thing;

RedirectUrlTable.property = [ontola.redirectUrl, ontola.href];

RedirectUrlTable.topology = tableRowTopology;

export default register(RedirectUrlTable);
