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
import { NS } from '../../helpers/LinkedRenderStore';
import Menu from '../../topologies/Menu';
import { navbarTopology } from '../../topologies/Navbar';
import { NavbarLinkLink, NavbarLinkWrapper } from '../../components/NavbarLink';
import { isFontAwesomeIRI } from '../../helpers/iris';

class MenuItemNavbar extends React.PureComponent {
  static type = [
    NS.ontola('MenuItem'),
    NS.argu('SubMenu'),
    NS.argu('Menu'),
  ];

  static topology = navbarTopology;

  static mapDataToProps = {
    href: NS.ontola('href'),
    image: NS.schema('image'),
    menuItems: NS.ontola('menuItems'),
    name: NS.schema('name'),
  };

  static propTypes = {
    href: linkType,
    image: linkType,
    imageOnly: PropTypes.bool,
    menuItems: linkType,
    showImage: PropTypes.bool,
    subject: subjectType,
  };

  render() {
    const {
      href,
      image,
      imageOnly,
      menuItems,
      showImage,
      subject,
    } = this.props;

    const id = `${subject}-menu-items`;

    const InnerWrapper = href ? React.Fragment : NavbarLinkLink;

    const menuItemLabel = (onClick) => {
      const wrapperProps = href ? {} : { onClick };
      const hideLabel = image && (!isFontAwesomeIRI(image.value) || (showImage && imageOnly));

      return (
        <NavbarLinkWrapper>
          <Property
            forceRender
            component={NavbarLinkLink}
            data-test="MenuItem-MenuItemLabel"
            handleClick={onClick}
            id={id}
            label={NS.ontola('href')}
          >
            <InnerWrapper {...wrapperProps}>
              <Property label={NS.schema('image')} />
              {!hideLabel && <Property label={NS.schema('name')} />}
            </InnerWrapper>
          </Property>
        </NavbarLinkWrapper>
      );
    };

    if (menuItems) {
      return (
        <Menu trigger={menuItemLabel}>
          {({ handleClose, ref }) => (
            <LinkedResourceContainer
              childProps={{
                onClose: handleClose,
                ref,
              }}
              subject={menuItems}
            />
          )}
        </Menu>
      );
    }

    return <Resource>{menuItemLabel()}</Resource>;
  }
}

export default register(MenuItemNavbar);
