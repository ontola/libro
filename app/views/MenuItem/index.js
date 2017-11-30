import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { Property } from 'link-redux';
import React from 'react';

import { SideBarLinkIcon } from '../../components/SideBarLink';
import { NS } from '../../helpers/LinkedRenderStore';

import href from './properties/href';
import menuItems from './properties/menuItems';

const MenuItemLabel = (
  <Property forceRender data-test="MenuItem-MenuItemLabel" label={NS.argu('href')}>
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
    labelComp={MenuItemLabel}
  />
);

export default [
  LinkedRenderStore.registerRenderer(
    MenuItemSidebar,
    [NS.argu('MenuItem'), NS.argu('SubMenu')],
    RENDER_CLASS_NAME,
    [NS.argu('sidebar'), NS.argu('sidebarBlock')]
  ),
  href,
  menuItems,
];
