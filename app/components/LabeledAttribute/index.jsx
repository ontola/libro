import {
  Property,
  Resource,
  linkType,
  useProperty,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import Heading from '../Heading';

import './LabeledAttribute.scss';

const LabeledAttribute = ({
  label,
  propertyLabel,
  wrapper,
}) => {
  const [hasLabel] = useProperty(label);
  const Wrapper = wrapper || 'div';

  if (!hasLabel) {
    return null;
  }

  return (
    <Wrapper className="LabeledAttribute">
      <Heading size="4">{propertyLabel || <Resource subject={label} />}</Heading>
      <Property label={label} limit={Infinity} />
    </Wrapper>
  );
};

LabeledAttribute.propTypes = {
  label: linkType,
  propertyLabel: PropTypes.string,
  wrapper: PropTypes.string,
};

export default LabeledAttribute;
