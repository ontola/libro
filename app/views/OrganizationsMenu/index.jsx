import { RENDER_CLASS_NAME } from 'link-lib';
import { Property } from 'link-redux';
import React from 'react';

import LinkedRenderStore, { NS } from '../../helpers/LinkedRenderStore';

import './OrganizationsMenu.scss';
import './properties/menuItems';

const OrganizationsMenu = () => (
  <Property
    forceRender
    label={NS.argu('menuItems')}
  />
);

[NS.argu('sidebar'), NS.argu('sidebarBlock')].forEach((top) => {
  LinkedRenderStore.registerRenderer(
    OrganizationsMenu,
    NS.argu('OrganizationsMenu'),
    RENDER_CLASS_NAME,
    top
  );
});
