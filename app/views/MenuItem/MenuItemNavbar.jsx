import {
  LinkedResourceContainer,
  Property,
  linkType,
  register,
  subjectType,
} from 'link-redux';
import React from 'react';
import PropTypes from 'prop-types';

import { Resource } from '../../components';
import DropdownMenu from '../../components/DropdownMenu';
import { NS } from '../../helpers/LinkedRenderStore';
import { navbarTopology } from '../../topologies/Navbar';
import { NavbarLinkLink, NavbarLinkWrapper } from '../../components/NavbarLink';

class MenuItemNavbar extends React.PureComponent {
  static type = [
    NS.ontola('MenuItem'),
    NS.argu('SubMenu'),
    NS.argu('Menu'),
  ];

  static topology = navbarTopology;

  static mapDataToProps = [
    NS.ontola('href'),
    NS.ontola('menuItems'),
    NS.schema('name'),
  ];

  static propTypes = {
    menuItems: linkType,
    showImage: PropTypes.bool,
    subject: subjectType,
  };

  render() {
    const {
      menuItems,
      showImage,
      subject,
    } = this.props;

    const id = `${subject}-menu-items`;

    const menuItemLabel = onClick => (
      <NavbarLinkWrapper>
        <Property
          forceRender
          component={NavbarLinkLink}
          data-test="MenuItem-MenuItemLabel"
          handleClick={onClick}
          id={id}
          label={NS.ontola('href')}
        >
          {showImage && <Property label={NS.schema('image')} />}
          <Property label={NS.schema('name')} />
        </Property>
      </NavbarLinkWrapper>
    );

    if (menuItems) {
      return (
        <DropdownMenu
          trigger={menuItemLabel}
        >
          <LinkedResourceContainer subject={menuItems} />
        </DropdownMenu>
      );
    }

    return <Resource>{menuItemLabel()}</Resource>;
  }
}

export default register(MenuItemNavbar);
