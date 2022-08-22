import * as schema from '@ontologies/schema';
import {
  Property,
  register,
  useProperty, 
} from 'link-redux';
import React from 'react';

import LDLink from '../../Common/components/LDLink';
import { LinkTarget } from '../../Common/components/Link';
import {
  cardFloatTopology,
  contentDetailsTopology,
  detailsBarTopology, 
} from '../../Common/topologies';
import { isInvalidActionStatus } from '../hooks/useValidActions';

const ActionDetail = () => {
  const [actionStatus] = useProperty(schema.actionStatus);
  const [name] = useProperty(schema.name);

  if (isInvalidActionStatus(actionStatus)) {
    return null;
  }

  return (
    <LDLink target={LinkTarget.Modal}>
      <Property
        label={schema.target}
        name={name.value}
      />
    </LDLink>
  );
};

ActionDetail.type = schema.Action;

ActionDetail.topology = [
  cardFloatTopology,
  contentDetailsTopology,
  detailsBarTopology,
];

export default register(ActionDetail);
