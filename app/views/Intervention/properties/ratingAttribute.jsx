import schema from '@ontologies/schema';
import {
  linkedPropType,
  register,
} from 'link-redux';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';
import { attributeListTopology } from '../../../topologies/AttributeList';
import { tryParseFloat } from '../../../helpers/numbers';

import './ratingAttribute.scss';

const ICON_COUNT = 5;

const renderIcon = (value, index, src) => {
  if (tryParseFloat(value) >= index) {
    return (
      <div className="Rating--image-wrapper" style={{ width: `${100 * (value - index)}%` }}>
        <img src={`${src}.png`} />
      </div>
    );
  }

  return null;
};

const RatingAttribute = ({ label, linkedProp }) => {
  const icon = label.value.includes('Costs') ? 'euro' : 'star';
  const src = `/assets/rivm/icons/${icon}`;

  return (
    Array(ICON_COUNT).fill().map((_, index) => (
      <div className="Rating" style={{ backgroundImage: `url(${src}-bgr.png)` }}>
        {renderIcon(linkedProp, index, src)}
      </div>
    ))
  );
};

RatingAttribute.type = schema.Thing;

RatingAttribute.topology = attributeListTopology;

RatingAttribute.property = [
  NS.rivm('securityImprovedScore'),
  NS.rivm('oneOffCostsScore'),
  NS.rivm('recurringCostsScore'),
];

RatingAttribute.propTypes = {
  linkedProp: linkedPropType,
};

export default register(RatingAttribute);
