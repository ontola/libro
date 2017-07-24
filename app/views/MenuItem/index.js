import React from 'react';
import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { Property } from 'link-redux';

import './properties/href';

const MenuItemSidebar = () => (
  <Property label="argu:href">
    <div className="SideBarLink__icon">
      <Property label="schema:image" />
    </div>
    <Property label="argu:label" />
  </Property>
);

LinkedRenderStore.registerRenderer(
  MenuItemSidebar,
  'argu:MenuItem',
  RENDER_CLASS_NAME,
  'argu:sidebar'
);
