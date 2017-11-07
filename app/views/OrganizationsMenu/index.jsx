import { RENDER_CLASS_NAME } from 'link-lib';
import { Property } from 'link-redux';
import React from 'react';
import FontAwesome from 'react-fontawesome';

import {
  Dropdown
} from '../../components';
import LinkedRenderStore, { NS } from '../../helpers/LinkedRenderStore';

import './OrganizationsMenu.scss';
import './properties/menuItems';

const OrganizationsMenu = () => (
  <Dropdown
    contentClassName="Dropdown__organizations_menu__content"
    trigger={<FontAwesome name="caret-square-o-down" />}
  >
    <Property label={NS.argu('menuItems')} />
  </Dropdown>
);

LinkedRenderStore.registerRenderer(
  OrganizationsMenu,
  NS.argu('OrganizationsMenu'),
  RENDER_CLASS_NAME,
  NS.argu('sidebarBlock')
);
