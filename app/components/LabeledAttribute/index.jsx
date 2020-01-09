import {
  Property,
  Resource,
  linkType,
  useLRS,
  useLinkRenderContext,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import './LabeledAttribute.scss';
import { Heading } from '../../components';

const LabeledAttribute = ({
  label,
  propertyLabel,
  wrapper,
}) => {
  const lrs = useLRS();
  const { subject } = useLinkRenderContext();
  const Wrapper = wrapper || 'div';

  if (!lrs.getResourceProperty(subject, label)) {
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
