import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { link, linkType, LinkedResourceContainer, Property, linkedPropType } from 'link-redux';
import React from 'react';

import { Dropdown, DropdownLink } from '../../components';
import { SideBarLinkIcon } from '../../components/SideBarLink';
import { NS } from '../../helpers/LinkedRenderStore';

import Href from './properties/href';
import Label from './properties/label';
import menuItemsComp from './properties/menuItems';

const MenuItemLabel = (
  <Property forceRender data-test="MenuItem-MenuItemLabel" label={NS.argu('href')}>
    <SideBarLinkIcon>
      <Property label={NS.schema('image')} />
    </SideBarLinkIcon>
    <Property label={NS.argu('label')} />
  </Property>
);

const MenuItemDropdownContent = ({ href, image, label }) => (
  <DropdownLink icon={image} url={href}>
    {label.value}
  </DropdownLink>
);

MenuItemDropdownContent.propTypes = {
  href: linkType,
  image: linkType,
  label: linkedPropType,
};

const MenuItemSidebar = () => (
  <Property
    forceRender
    label={NS.argu('menuItems')}
    labelComp={MenuItemLabel}
  />
);

const MenuItemDropdown = ({ menuItems }) => (
  <Dropdown
    trigger={<Property label={NS.argu('label')} />}
  >
    <LinkedResourceContainer subject={menuItems} topology={NS.argu('dropdownContent')} />
  </Dropdown>
);

MenuItemDropdown.propTypes = {
  menuItems: linkType,
};

export default [
  LinkedRenderStore.registerRenderer(
    MenuItemSidebar,
    [NS.argu('MenuItem'), NS.argu('SubMenu')],
    RENDER_CLASS_NAME,
    NS.argu('sidebar')
  ),
  LinkedRenderStore.registerRenderer(
    link([NS.argu('href'), NS.argu('label'), NS.schema('image')])(MenuItemDropdownContent),
    NS.argu('MenuItem'),
    RENDER_CLASS_NAME,
    NS.argu('dropdownContent')
  ),
  LinkedRenderStore.registerRenderer(
    link([NS.argu('menuItems')])(MenuItemDropdown),
    [
      NS.argu('MenuItem'),
      NS.argu('SubMenu'),
      NS.argu('ActionsMenu'),
      NS.argu('FollowMenu'),
      NS.argu('ShareMenu'),
    ],
    RENDER_CLASS_NAME,
    NS.argu('cardMain')
  ),
  Href,
  Label,
  menuItemsComp,
];
