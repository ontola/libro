import schema from '@ontologies/schema';
import {
  Property,
  Resource,
  linkType,
  register,
  subjectType,
} from 'link-redux';
import React from 'react';
import PropTypes from 'prop-types';

import ResourceBoundary from '../../components/ResourceBoundary';
import argu from '../../ontology/argu';
import ontola from '../../ontology/ontola';
import Menu from '../../topologies/Menu';
import { navbarTopology } from '../../topologies/Navbar';
import { NavbarLinkLink, NavbarLinkWrapper } from '../../components/NavbarLink';
import { isFontAwesomeIRI } from '../../helpers/iris';

class MenuItemNavbar extends React.PureComponent {
  static type = [
    ontola.MenuItem,
    argu.SubMenu,
    argu.Menu,
  ];

  static topology = navbarTopology;

  static mapDataToProps = {
    href: ontola.href,
    image: schema.image,
    menuItems: ontola.menuItems,
    name: schema.name,
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
            label={ontola.href}
          >
            <InnerWrapper {...wrapperProps}>
              <Property label={schema.image} />
              {!hideLabel && <Property label={schema.name} />}
            </InnerWrapper>
          </Property>
        </NavbarLinkWrapper>
      );
    };

    if (menuItems) {
      return (
        <Menu trigger={menuItemLabel}>
          {({ handleClose, ref }) => (
            <Resource
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

    return <ResourceBoundary>{menuItemLabel()}</ResourceBoundary>;
  }
}

export default register(MenuItemNavbar);
