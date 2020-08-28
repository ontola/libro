import schema from '@ontologies/schema';
import {
  Resource,
  linkType,
  register,
  subjectType,
} from 'link-redux';
import React from 'react';
import PropTypes from 'prop-types';

import { NavbarLinkLink } from '../../components/NavbarLink';
import { isFontAwesomeIRI, normalizeFontAwesomeIRI } from '../../helpers/iris';
import argu from '../../ontology/argu';
import ontola from '../../ontology/ontola';
import Menu from '../../topologies/Menu';
import { navbarTopology } from '../../topologies/Navbar';

const MenuItemNavbar = ({
  href,
  image,
  name,
  menuItems,
}) => {
  const menuItemLabel = (onClick) => {
    const icon = (image && isFontAwesomeIRI(image.value))
      ? normalizeFontAwesomeIRI(image)
      : null;

    return (
      <NavbarLinkLink
        icon={icon}
        image={icon ? null : image}
        label={name?.value}
        to={href?.value}
        onClick={onClick}
      />
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

  return menuItemLabel();
};

MenuItemNavbar.type = [
  ontola.MenuItem,
  argu.SubMenu,
  argu.Menu,
];

MenuItemNavbar.topology = navbarTopology;

MenuItemNavbar.mapDataToProps = {
  href: ontola.href,
  image: schema.image,
  menuItems: ontola.menuItems,
  name: schema.name,
};

MenuItemNavbar.propTypes = {
  href: linkType,
  image: linkType,
  imageOnly: PropTypes.bool,
  menuItems: linkType,
  subject: subjectType,
};

export default register(MenuItemNavbar);
