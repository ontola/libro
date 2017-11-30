import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { Property } from 'link-redux';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';

import './OrganizationsMenu.scss';
import MenuItems from './properties/menuItems';

const OrganizationsMenu = () => (
  <Property
    forceRender
    label={NS.argu('menuItems')}
  />
);

export default [
  LinkedRenderStore.registerRenderer(
    OrganizationsMenu,
    NS.argu('OrganizationsMenu'),
    RENDER_CLASS_NAME,
    [NS.argu('sidebar'), NS.argu('sidebarBlock')]
  ),
  MenuItems,
];
