import * as schema from '@ontologies/schema';
import {
  Property,
  register,
  useProperty, 
} from 'link-redux';
import React from 'react';

import LDLink from '../../components/LDLink';
import { LinkTarget } from '../../components/Link';
import { cardFloatTopology } from '../../topologies/Card/CardFloat';
import { contentDetailsTopology } from '../../topologies/ContentDetails';
import { detailsBarTopology } from '../../topologies/DetailsBar';
import { isInvalidActionStatus } from '../Thing/properties/omniform/helpers';

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
