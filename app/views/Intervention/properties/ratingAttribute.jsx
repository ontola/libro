import schema from '@ontologies/schema';
import {
  linkedPropType,
  register,
  useLRS,
} from 'link-redux';
import React from 'react';

import rivm from '../../../ontology/rivm';
import { attributeListTopology } from '../../../topologies/AttributeList';
import { tryParseFloat } from '../../../helpers/numbers';

import './ratingAttribute.scss';

const ICON_COUNT = 5;

const renderIcon = (value, index, src) => {
  const float = tryParseFloat(value);
  if (float >= index) {
    return (
      <div className="Rating--image-wrapper" style={{ width: `${100 * (float - index)}%` }}>
        <img src={`${src}.png`} />
      </div>
    );
  }

  return null;
};

const RatingAttribute = ({
  label,
  labelFrom,
  linkedProp,
  subject,
}) => {
  let labelValue;
  if (labelFrom) {
    const lrs = useLRS();
    const labelObj = lrs.getResourceProperty(subject, labelFrom);
    labelValue = labelObj && lrs.getResourceProperty(labelObj, schema.name);
  }
  const icon = label.value.includes('Costs') ? 'euro' : 'star';
  const src = `/assets/rivm/icons/${icon}`;

  return (
    Array(ICON_COUNT).fill().map((_, index) => (
      <div
        className="Rating"
        style={{ backgroundImage: `url(${src}-bgr.png)` }}
        title={labelValue?.value}
      >
        {renderIcon(linkedProp, index, src)}
      </div>
    ))
  );
};

RatingAttribute.type = schema.Thing;

RatingAttribute.topology = attributeListTopology;

RatingAttribute.property = [
  rivm.securityImprovedScore,
  rivm.oneOffCostsScore,
  rivm.recurringCostsScore,
];

RatingAttribute.propTypes = {
  linkedProp: linkedPropType,
};

export default register(RatingAttribute);
