import schema from '@ontologies/schema';
import LinkedRenderStore from 'link-lib';
import { LinkedResourceContainer, linkedPropType } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';
import { navbarTopology } from '../../../topologies/Navbar';

const propTypes = {
  children: PropTypes.node,
  linkedProp: linkedPropType,
};

const ThingMenusProp = ({ children, linkedProp }) => {
  if (children) {
    return (
      <LinkedResourceContainer
        subject={linkedProp}
        topology={navbarTopology}
      >
        {children}
      </LinkedResourceContainer>
    );
  }

  return (
    <LinkedResourceContainer
      subject={linkedProp}
      topology={navbarTopology}
    />
  );
};

ThingMenusProp.propTypes = propTypes;

export default LinkedRenderStore.registerRenderer(
  ThingMenusProp,
  schema.Thing,
  [NS.ontola('menus'), NS.ontola('navigationsMenu')],
  navbarTopology
);
