import LinkedRenderStore from 'link-lib';
import { LinkedResourceContainer, linkedPropType } from 'link-redux';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';

const propTypes = {
  linkedProp: linkedPropType,
};

const ThingMenusProp = ({ linkedProp }) =>
  <LinkedResourceContainer subject={linkedProp} topology={NS.argu('sidebar')} />;

ThingMenusProp.propTypes = propTypes;

export default LinkedRenderStore.registerRenderer(
  ThingMenusProp,
  NS.schema('Thing'),
  [NS.argu('menus'), NS.argu('navigationsMenu')],
  NS.argu('sidebarBlock')
);
