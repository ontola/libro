import * as schema from '@ontologies/schema';
import {
  labelType,
  linkedPropType,
  register,
  useProperty,
  useResourceProperty,
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
}) => {
  const [labelObj] = useProperty(labelFrom);
  const labelValue = useResourceProperty(labelObj, schema.name);

  const icon = label.value.includes('Costs') ? 'euro' : 'star';
  const src = `/assets/rivm/icons/${icon}`;

  /* eslint-disable react/no-array-index-key */
  return (
    <React.Fragment>
      {Array(ICON_COUNT).fill().map((_, index) => (
        <div
          className="Rating"
          key={`${src}-${index}`}
          style={{ backgroundImage: `url(${src}-bgr.png)` }}
          title={labelValue?.value}
        >
          {renderIcon(linkedProp, index, src)}
        </div>
      ))}
    </React.Fragment>
  );
  /* eslint-enable react/no-array-index-key */
};

RatingAttribute.type = schema.Thing;

RatingAttribute.topology = attributeListTopology;

RatingAttribute.property = [
  rivm.securityImprovedScore,
  rivm.oneOffCostsScore,
  rivm.recurringCostsScore,
];

RatingAttribute.propTypes = {
  label: labelType,
  labelFrom: labelType,
  linkedProp: linkedPropType,
};

export default register(RatingAttribute);
