import { LinkedObjectContainer } from 'link-redux';
import React, { PropTypes } from 'react';

import LinkedRenderStore, { NS } from '../../../helpers/LinkedRenderStore';

const propTypes = {
  linkedProp: PropTypes.string,
};

const ThingMenusProp = ({ linkedProp }) =>
  <LinkedObjectContainer object={linkedProp} topology={NS.argu('sidebar')} />;

ThingMenusProp.propTypes = propTypes;

LinkedRenderStore.registerRenderer(
  ThingMenusProp,
  NS.schema('Thing'),
  NS.argu('menus'),
  NS.argu('sidebarBlock')
);

export default ThingMenusProp;
