import {
  linkType,
  LinkedResourceContainer,
  Property,
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

class MenuItemNavbar extends React.PureComponent {
  static type = [
    NS.argu('MenuItem'),
    NS.argu('SubMenu'),
    NS.argu('Menu'),
  ];

  static topology = navbarTopology;

  static mapDataToProps = [
    NS.argu('href'),
    NS.argu('menuItems'),
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
      <Property
        forceRender
        data-test="MenuItem-MenuItemLabel"
        id={id}
        label={NS.argu('href')}
      >
        {showImage && <Property label={NS.schema('image')} />}
        <Property label={NS.schema('name')} />
      </Property>
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
