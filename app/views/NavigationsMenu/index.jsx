import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { Property } from 'link-redux';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';

import MenuItems from './properties/menuItems';

const NavigationsMenuSidebar = () => (
  <Property forceRender label={NS.argu('menuItems')} />
);

export default [
  LinkedRenderStore.registerRenderer(
    NavigationsMenuSidebar,
    NS.argu('NavigationsMenu'),
    RENDER_CLASS_NAME,
    NS.argu('sidebar')
  ),
  MenuItems,
];
