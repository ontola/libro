import schema from '@ontologies/schema';
import {
  Resource,
  linkedPropType,
  register,
} from 'link-redux';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';
import { allTopologies } from '../../../topologies';
import { inlineTopology } from '../../../topologies/Inline';

import './iconAttribute.scss';

const IconAttribute = ({ linkedProp }) => (
  <div className="IconAttribute">
    <span className="img-wrapper">
      <img src={`/assets/rivm/icons/${linkedProp.value.split('form_option/')[1]}.png`} />
    </span>
    <Resource subject={linkedProp} topology={inlineTopology} />
  </div>
);

IconAttribute.type = schema.Thing;

IconAttribute.topology = allTopologies;

IconAttribute.property = [
  schema.industry,
  NS.rivm('interventionEffects'),
  NS.rivm('targetAudience'),
];

IconAttribute.propTypes = {
  linkedProp: linkedPropType,
};

export default register(IconAttribute);
