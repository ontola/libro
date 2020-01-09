import schema from '@ontologies/schema';
import LinkedRenderStore from 'link-lib';
import { Resource, linkedPropType } from 'link-redux';
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
      <Resource
        subject={linkedProp}
        topology={navbarTopology}
      >
        {children}
      </Resource>
    );
  }

  return (
    <Resource
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
