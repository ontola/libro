import * as schema from '@ontologies/schema';
import {
  FC,
  PropertyProps,
  Resource,
  register,
} from 'link-redux';
import React from 'react';

import Link from '../../../components/Link';
import { isDifferentWebsite } from '../../../helpers/iris';
import dexes from '../../../ontology/dexes';
import { allTopologies } from '../../../topologies';

const Recipient: FC<PropertyProps> = ({
  children,
  linkedProp,
}) => {
  if (!children && isDifferentWebsite(linkedProp.value)) {
    return (
      <Link
        allowExternal={false}
        to={linkedProp.value}
      >
        {linkedProp.value}
      </Link>
    );
  }

  return (
    <Resource subject={linkedProp}>
      {children}
    </Resource>
  );
};

Recipient.type = schema.Thing;

Recipient.topology = allTopologies;

Recipient.property = dexes.dataOwner;

export default register(Recipient);
