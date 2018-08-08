import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import {
  link,
  linkType,
  LinkedResourceContainer,
  Property,
  linkedPropType,
} from 'link-redux';
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
    <Property label={NS.schema('name')} />
  </Property>
);

const MenuItemDropdownContent = ({ href, image, name }) => (
  <DropdownLink icon={image} url={href}>
    {name.value}
  </DropdownLink>
);

MenuItemDropdownContent.propTypes = {
  href: linkType,
  image: linkType,
  name: linkedPropType,
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
    trigger={<Property label={NS.schema('name')} />}
  >
    <LinkedResourceContainer subject={menuItems} topology={NS.argu('dropdownContent')} />
  </Dropdown>
);

MenuItemDropdown.propTypes = {
  menuItems: linkType,
};

const MenuItemPage = ({ topLevel }) => (
  <Resource>
    {topLevel && (
    <Container>
      <Card>
        <Property label={NS.schema('isPartOf')} />
      </Card>
    </Container>
    )}
    <Property label={NS.argu('parentMenu')} topLevel={false} />
    <TabBar>
      <Property label={NS.argu('menuItems')} />
    </TabBar>
    <Property label={NS.argu('href')} />
  </Resource>
);

MenuItemPage.propTypes = {
  topLevel: linkType,
};

MenuItemPage.defaultProps = {
  topLevel: true,
};

const MenuItemTab = ({ name }) => (
  <Resource>
    <Tab
      icon={<Property label={NS.schema('image')} />}
      label={name.value}
    />
  </Resource>
);

MenuItemTab.propTypes = {
  name: linkType,
};

export default [
  LinkedRenderStore.registerRenderer(
    MenuItemSidebar,
    [NS.argu('MenuItem'), NS.argu('SubMenu'), NS.argu('Menu')],
    RENDER_CLASS_NAME,
    NS.argu('sidebar')
  ),
  LinkedRenderStore.registerRenderer(
    link([NS.argu('href'), NS.schema('name'), NS.schema('image')])(MenuItemDropdownContent),
    NS.argu('MenuItem'),
    RENDER_CLASS_NAME,
    NS.argu('dropdownContent')
  ),
  LinkedRenderStore.registerRenderer(
    link([NS.argu('menuItems')])(MenuItemDropdown),
    [
      NS.argu('MenuItem'),
      NS.argu('SubMenu'),
      NS.argu('Menu'),
    ],
    RENDER_CLASS_NAME,
    NS.argu('cardMain')
  ),
  Href,
  Label,
  menuItemsComp,
];
