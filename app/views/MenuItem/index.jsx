import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import {
  link,
  linkType,
  Property,
  lrsType,
  subjectType,
} from 'link-redux';
import React from 'react';

import {
  DropdownLink,
  Resource,
  Tab,
} from '../../components';
import { NS } from '../../helpers/LinkedRenderStore';
import { dropdownContentTopology } from '../../topologies/DropdownContent';
import { tabBarTopology } from '../../topologies/TabBar';

import MenuItemDropdown from './MenuItemDropdown';
import MenuItemPage from './MenuItemPage';
import MenuItemSidebar from './MenuItemSidebar';
import Href from './properties/href';
import Label from './properties/label';
import menuItemsComp from './properties/menuItems';

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
        action={this.props.action ? this.action : undefined}
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
  MenuItemDropdown,
  MenuItemPage,
  MenuItemSidebar,
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
