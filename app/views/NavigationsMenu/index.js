import React from 'react';
import { RENDER_CLASS_NAME } from 'link-lib';
import { Property } from 'link-redux';

import LinkedRenderStore, { NS } from '../../helpers/LinkedRenderStore';

import './properties/menuItems';

const NavigationsMenuSidebar = () => (
  <Property label={NS.argu('menuItems')} />
);

LinkedRenderStore.registerRenderer(
  NavigationsMenuSidebar,
  NS.argu('NavigationsMenu'),
  RENDER_CLASS_NAME,
  NS.argu('sidebar')
);
