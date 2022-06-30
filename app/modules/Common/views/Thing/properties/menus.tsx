import { Node } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import { Resource, register } from 'link-redux';
import React from 'react';

import ontola from '../../../../Core/ontology/ontola';
import { navbarTopology } from '../../../../NavBar/topologies/Navbar';

interface ThingMenusProp {
  children: React.ReactNode;
  linkedProp: Node;
}

const ThingMenusProp = ({ children, linkedProp }: ThingMenusProp): JSX.Element => {
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

ThingMenusProp.type = schema.Thing;

ThingMenusProp.property = [
  ontola.menus,
  ontola.navigationsMenu,
];

ThingMenusProp.topology = navbarTopology;

export default register(ThingMenusProp);
