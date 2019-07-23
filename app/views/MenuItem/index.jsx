import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import {
  link,
  linkType,
  lrsType,
  subjectType,
} from 'link-redux';
import React from 'react';

import { MenuItem } from '../../components';
import { NS } from '../../helpers/LinkedRenderStore';
import { menuTopology } from '../../topologies/Menu';

import MenuItemAppMenu from './MenuItemAppMenu';
import MenuItemDropdown from './MenuItemDropdown';
import MenuItemPage from './MenuItemPage';
import MenuItemHeader from './MenuItemNavbar';
import MenuItemTab from './MenuItemTab';
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

  action(e) {
    // eslint-disable-next-line no-unused-expressions
    e?.preventDefault();
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
      <MenuItem
        action={this.props.action ? this.action : undefined}
        icon={image}
        lrs={lrs}
        subject={subject}
        url={href}
      >
        {this.state.nameOverride || name.value}
      </MenuItem>
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

export default [
  MenuItemAppMenu,
  MenuItemDropdown,
  MenuItemPage,
  MenuItemHeader,
  MenuItemTab,
  LinkedRenderStore.registerRenderer(
    link([
      NS.ontola('action'),
      NS.ontola('href'),
      NS.schema('name'),
      NS.schema('image'),
    ])(MenuItemDropdownContent),
    NS.ontola('MenuItem'),
    RENDER_CLASS_NAME,
    menuTopology
  ),
  Href,
  LabelCard,
  LabelHeader,
  menuItemsComp,
];
