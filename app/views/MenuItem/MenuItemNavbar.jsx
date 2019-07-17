import {
  LinkedResourceContainer,
  Property,
  linkType,
  register,
  subjectType,
} from 'link-redux';
import React from 'react';
import PropTypes from 'prop-types';

import {
  Dropdown,
  Resource,
} from '../../components';
import { NS } from '../../helpers/LinkedRenderStore';
import { dropdownContentTopology } from '../../topologies/DropdownContent';
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
    const { menuItems, showImage, subject } = this.props;

    const id = `${subject}-menu-items`;

    const MenuItemLabel = (
      <NavbarLinkWrapper>
        <Property
          forceRender
          component={NavbarLinkLink}
          data-test="MenuItem-MenuItemLabel"
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
        <Dropdown
          lazy
          trigger={MenuItemLabel}
        >
          {() => (
            <Resource>
              <LinkedResourceContainer subject={menuItems} topology={dropdownContentTopology} />
            </Resource>
          )}
        </Dropdown>
      );
    }

    return <Resource>{MenuItemLabel}</Resource>;
  }
}

export default register(MenuItemNavbar);
