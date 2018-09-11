import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import {
  link,
  linkType,
  LinkedResourceContainer,
  Property,
  lrsType,
  subjectType,
} from 'link-redux';
import React from 'react';

import {
  Dropdown,
  DropdownLink,
  Resource,
  Tab,
} from '../../components';
import { SideBarLinkIcon } from '../../components/SideBarLink';
import { NS } from '../../helpers/LinkedRenderStore';
import { cardFloatTopology } from '../../topologies/Card/CardFloat';
import { dropdownContentTopology } from '../../topologies/DropdownContent';
import { sidebarTopology } from '../../topologies/Sidebar';
import { tabBarTopology } from '../../topologies/TabBar';

import MenuItemPage from './MenuItemPage';
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
class MenuItemDropdownContent extends React.PureComponent {
  constructor() {
    super();

    this.action = this.action.bind(this);
    this.state = {
      nameOverride: undefined,
    };
  }

  action() {
    this.props.lrs
      .exec(this.props.action)
      .then((msg) => {
        if (typeof msg === 'string') {
          this.setState({
            nameOverride: msg,
          });
        }
      });
  }

  render() {
    const {
      href,
      image,
      name,
      lrs,
      subject,
    } = this.props;

    return (
      <DropdownLink
        action={this.props.action && this.action}
        icon={image}
        lrs={lrs}
        subject={subject}
        url={href}
      >
        {this.state.nameOverride || name.value}
      </DropdownLink>
    );
  }
}

MenuItemDropdownContent.propTypes = {
  action: linkType,
  href: linkType,
  image: linkType,
  lrs: lrsType,
  name: linkType,
  subject: subjectType,
};

const MenuItemSidebar = () => (
  <Resource>
    <Property
      forceRender
      label={NS.argu('menuItems')}
      labelComp={MenuItemLabel}
    />
  </Resource>
);

const MenuItemDropdown = ({ menuItems }) => (
  <Resource>
    <Dropdown
      trigger={<Property label={NS.schema('name')} />}
    >
      <LinkedResourceContainer subject={menuItems} topology={dropdownContentTopology} />
    </Dropdown>
  </Resource>
);

MenuItemDropdown.propTypes = {
  menuItems: linkType,
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
    sidebarTopology
  ),
  LinkedRenderStore.registerRenderer(
    link([
      NS.argu('action'),
      NS.argu('href'),
      NS.schema('name'),
      NS.schema('image'),
    ])(MenuItemDropdownContent),
    NS.argu('MenuItem'),
    RENDER_CLASS_NAME,
    dropdownContentTopology
  ),
  LinkedRenderStore.registerRenderer(
    link([NS.argu('menuItems')])(MenuItemDropdown),
    [
      NS.argu('MenuItem'),
      NS.argu('MenuSection'),
      NS.argu('SubMenu'),
      NS.argu('Menu'),
    ],
    RENDER_CLASS_NAME,
    cardFloatTopology
  ),
  MenuItemPage,
  LinkedRenderStore.registerRenderer(
    link([
      NS.schema('name'),
    ])(MenuItemTab),
    [
      NS.argu('MenuItem'),
      NS.argu('MenuSection'),
      NS.argu('SubMenu'),
      NS.argu('Menu'),
    ],
    RENDER_CLASS_NAME,
    tabBarTopology
  ),
  Href,
  Label,
  menuItemsComp,
];
