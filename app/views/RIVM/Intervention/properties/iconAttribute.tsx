import { isNamedNode } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import {
  FC,
  PropertyProps,
  register,
  useDataFetching,
  useDataInvalidation,
  useResourceProperty,
} from 'link-redux';
import React from 'react';

import rivm from '../../../../ontology/rivm';
import { allTopologies } from '../../../../topologies';

import './iconAttribute.scss';

const IconAttribute: FC<PropertyProps> = ({
  linkedProp,
  subject,
}) => {
  useDataInvalidation(subject);
  useDataFetching(isNamedNode(linkedProp) ? linkedProp : []);

  const [name] = useResourceProperty(isNamedNode(linkedProp) ? linkedProp : undefined, schema.name);
  if (!name) {
    return null;
  }

  return (
    <div className="IconAttribute">
      <span className="img-wrapper">
        <img
          alt=""
          src={`/assets/rivm/icons/${linkedProp.value.split('#')[1]}.png`}
          title={name.value}
        />
      </span>
    </div>
  );
};

IconAttribute.type = schema.Thing;

IconAttribute.topology = allTopologies;

IconAttribute.property = [
  schema.industry,
  rivm.interventionEffects,
  rivm.targetAudience,
];

export default register(IconAttribute);
