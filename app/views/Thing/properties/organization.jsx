import { LinkedObjectContainer } from 'link-redux';
import React, { PropTypes } from 'react';

import LinkedRenderStore from '../../../helpers/LinkedRenderStore';

const propTypes = {
  linkedProp: PropTypes.string,
};

const ThingOrganizationProp = ({ linkedProp }) =>
  <LinkedObjectContainer object={linkedProp} topology="argu:sidebarBlock" />;

ThingOrganizationProp.propTypes = propTypes;

LinkedRenderStore.registerRenderer(
  ThingOrganizationProp,
  'http://schema.org/Thing',
  'http://schema.org/organization'
);

export default ThingOrganizationProp;
