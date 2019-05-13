import LinkedRenderStore from 'link-lib';
import { LinkedResourceContainer, linkedPropType } from 'link-redux';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';
import { navbarTopology } from '../../../topologies/Navbar';

const propTypes = {
  linkedProp: linkedPropType,
};

const ThingMenusProp = ({ linkedProp }) => (
  <LinkedResourceContainer
    subject={linkedProp}
    topology={navbarTopology}
  />
);

ThingMenusProp.propTypes = propTypes;

export default LinkedRenderStore.registerRenderer(
  ThingMenusProp,
  NS.schema('Thing'),
  [NS.ontola('menus'), NS.ontola('navigationsMenu')],
  navbarTopology
);
