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

import MenuItemAppMenu from './MenuItemAppMenu';
import MenuItemDropdown from './MenuItemDropdown';
import MenuItemPage from './MenuItemPage';
import MenuItemHeader from './MenuItemNavbar';
import Href from './properties/href';
import LabelCard from './properties/labelCard';
import LabelHeader from './properties/labelHeader';
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
  MenuItemAppMenu,
  MenuItemDropdown,
  MenuItemPage,
  MenuItemHeader,
  LinkedRenderStore.registerRenderer(
    link([
      NS.ontola('action'),
      NS.ontola('href'),
      NS.schema('name'),
      NS.schema('image'),
    ])(MenuItemDropdownContent),
    NS.ontola('MenuItem'),
    RENDER_CLASS_NAME,
    dropdownContentTopology
  ),
  LinkedRenderStore.registerRenderer(
    link([
      NS.schema('name'),
    ])(MenuItemTab),
    [
      NS.ontola('MenuItem'),
      NS.argu('MenuSection'),
      NS.argu('SubMenu'),
      NS.argu('Menu'),
    ],
    RENDER_CLASS_NAME,
    tabBarTopology
  ),
  Href,
  LabelCard,
  LabelHeader,
  menuItemsComp,
];
