import React from 'react';
import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { Property } from 'link-redux';

import './properties/menuItems';

const NavigationsMenuSidebar = () => (
  <Property label="argu:menuItems" />
);

LinkedRenderStore.registerRenderer(
  NavigationsMenuSidebar,
  'argu:NavigationsMenu',
  RENDER_CLASS_NAME,
  'sidebar'
);
