import { LinkedObjectContainer, linkedPropType } from 'link-redux';
import React from 'react';

import LinkedRenderStore, { NS } from '../../../helpers/LinkedRenderStore';

const propTypes = {
  linkedProp: linkedPropType,
};

const ThingMenusProp = ({ linkedProp }) =>
  <LinkedObjectContainer object={linkedProp} topology={NS.argu('sidebar')} />;

ThingMenusProp.propTypes = propTypes;

LinkedRenderStore.registerRenderer(
  ThingMenusProp,
  NS.schema('Thing'),
  [NS.argu('menus'), NS.argu('navigationsMenu')],
  NS.argu('sidebarBlock')
);

export default ThingMenusProp;
