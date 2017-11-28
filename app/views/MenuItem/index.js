import React from 'react';
import { RENDER_CLASS_NAME } from 'link-lib';
import { Property } from 'link-redux';

import { SideBarLinkIcon } from '../../components/SideBarLink';
import LinkedRenderStore, { NS } from '../../helpers/LinkedRenderStore';

import './properties/href';
import './properties/menuItems';

const label = (
  <Property forceRender label={NS.argu('href')}>
    <SideBarLinkIcon>
      <Property label={NS.schema('image')} />
    </SideBarLinkIcon>
    <Property label={NS.argu('label')} />
  </Property>
);

const MenuItemSidebar = () => (
  <Property
    forceRender
    label={NS.argu('menuItems')}
    labelComp={label}
  />
);

[NS.argu('sidebar'), NS.argu('sidebarBlock')].forEach((top) => {
  LinkedRenderStore.registerRenderer(
    MenuItemSidebar,
    NS.argu('MenuItem'),
    RENDER_CLASS_NAME,
    top
  );
});
