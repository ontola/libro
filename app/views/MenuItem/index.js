import React from 'react';
import { RENDER_CLASS_NAME } from 'link-lib';
import { Property } from 'link-redux';

import LinkedRenderStore, { NS } from '../../helpers/LinkedRenderStore';

import './properties/href';

const MenuItemSidebar = () => (
  <Property label={NS.argu('href')}>
    <div className="SideBarLink__icon">
      <Property label={NS.schema('image')} />
    </div>
    <Property label={NS.argu('label')} />
  </Property>
);

LinkedRenderStore.registerRenderer(
  MenuItemSidebar,
  NS.argu('MenuItem'),
  RENDER_CLASS_NAME,
  NS.argu('sidebar')
);
