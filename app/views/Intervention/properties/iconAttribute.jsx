import schema from '@ontologies/schema';
import {
  linkedPropType,
  register,
  useResourceProperty,
} from 'link-redux';
import React from 'react';

import rivm from '../../../ontology/rivm';
import { allTopologies } from '../../../topologies';

import './iconAttribute.scss';

const IconAttribute = ({ linkedProp }) => {
  const [name] = useResourceProperty(linkedProp, schema.name)

  return (
    <div className="IconAttribute">
      <span className="img-wrapper">
        <img
          src={`/assets/rivm/icons/${linkedProp.value.split('form_option/')[1]}.png`}
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
};

export default register(IconAttribute);
