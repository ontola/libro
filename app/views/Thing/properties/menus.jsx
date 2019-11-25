import schema from '@ontologies/schema';
import LinkedRenderStore from 'link-lib';
import { LinkedResourceContainer, linkedPropType } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import ontola from '../../../ontology/ontola';
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
  [ontola.menus, ontola.navigationsMenu],
  navbarTopology
);
