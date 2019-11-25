import schema from '@ontologies/schema';
import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { Property } from 'link-redux';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';
import ontola from '../../ontology/ontola';
import { navbarTopology } from '../../topologies/Navbar';

import MenuSectionName from './properties/name';

const MenuSection = () => (
  <div data-test="MenuSection-menu-section">
    <Property label={schema.name} />
    <Property
      forceRender
      label={ontola.menuItems}
    />
  </div>
);

export default [
  LinkedRenderStore.registerRenderer(
    MenuSection,
    [NS.argu('MenuSection')],
    RENDER_CLASS_NAME,
    navbarTopology
  ),
  MenuSectionName,
];
