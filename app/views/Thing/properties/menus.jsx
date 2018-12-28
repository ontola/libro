import LinkedRenderStore from 'link-lib';
import { LinkedResourceContainer, linkedPropType } from 'link-redux';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';
import { headerTopology } from '../../../topologies/Header';

const propTypes = {
  linkedProp: linkedPropType,
};

const ThingMenusProp = ({ linkedProp }) => (
  <LinkedResourceContainer
    subject={linkedProp}
    topology={headerTopology}
  />
);

ThingMenusProp.propTypes = propTypes;

export default LinkedRenderStore.registerRenderer(
  ThingMenusProp,
  NS.schema('Thing'),
  [NS.argu('menus'), NS.argu('navigationsMenu')],
  headerTopology
);
