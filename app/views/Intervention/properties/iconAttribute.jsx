import schema from '@ontologies/schema';
import {
  linkedPropType,
  register,
  subjectType,
  useDataFetching,
  useDataInvalidation,
  useResourceProperty,
} from 'link-redux';
import React from 'react';

import rivm from '../../../ontology/rivm';
import { allTopologies } from '../../../topologies';

import './iconAttribute.scss';

const IconAttribute = ({
  linkedProp,
  subject,
}) => {
  useDataInvalidation(subject);
  useDataFetching(linkedProp);

  const [name] = useResourceProperty(linkedProp, schema.name);
  if (!name) {
    return null;
  }

  return (
    <div className="IconAttribute">
      <span className="img-wrapper">
        <img
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

IconAttribute.propTypes = {
  linkedProp: linkedPropType,
  subject: subjectType,
};

export default register(IconAttribute);
