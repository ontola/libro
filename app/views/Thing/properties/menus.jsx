import { LinkedObjectContainer } from 'link-redux';
import React, { PropTypes } from 'react';

import LinkedRenderStore from '../../../helpers/LinkedRenderStore';

const propTypes = {
  linkedProp: PropTypes.string,
};

const ThingMenusProp = ({ linkedProp }) =>
  <LinkedObjectContainer object={linkedProp} topology="argu:sidebar" />;

ThingMenusProp.propTypes = propTypes;

LinkedRenderStore.registerRenderer(
  ThingMenusProp,
  'http://schema.org/Thing',
  'argu:menus',
  'argu:sidebarBlock'
);

export default ThingMenusProp;
