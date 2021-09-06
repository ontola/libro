import rdf from '@ontologies/core';
import * as schema from '@ontologies/schema';
import {
  Property,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';

import LDLink from '../../components/LDLink';
import { cardFloatTopology } from '../../topologies/Card/CardFloat';
import { contentDetailsTopology } from '../../topologies/ContentDetails/index';
import { detailsBarTopology } from '../../topologies/DetailsBar';
import { invalidStatusIds } from '../Thing/properties/omniform/helpers';

const ActionDetail = () => {
  const [actionStatus] = useProperty(schema.actionStatus);
  const [name] = useProperty(schema.name);

  if (actionStatus && invalidStatusIds.includes(rdf.id(actionStatus))) {
    return null;
  }

  return (
    <LDLink>
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
