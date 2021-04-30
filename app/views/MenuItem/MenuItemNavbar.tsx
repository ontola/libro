import { Literal, NamedNode } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import { SomeNode } from 'link-lib';
import {
  FC,
  Resource,
  register,
} from 'link-redux';
import React, { ForwardedRef } from 'react';

import { NavbarLinkLink } from '../../components/NavbarLink';
import { isFontAwesomeIRI, normalizeFontAwesomeIRI } from '../../helpers/iris';
import argu from '../../ontology/argu';
import ontola from '../../ontology/ontola';
import Menu from '../../topologies/Menu';
import { navbarTopology } from '../../topologies/Navbar';

interface MenuItemNavbarProps {
  href?: NamedNode;
  image?: SomeNode;
  imageOnly?: boolean;
  name?: Literal;
  menuItems?: SomeNode;
}

interface MenuChildProps {
  handleClose: () => void;
  ref: ForwardedRef<unknown>;
}

const MenuItemNavbar: FC<MenuItemNavbarProps> = ({
  href,
  image,
  name,
  menuItems,
}) => {
  const menuItemLabel = React.useCallback((onClick) => {
    const icon = (image && isFontAwesomeIRI(image.value))
      ? normalizeFontAwesomeIRI(image)
      : undefined;

    return (
      <NavbarLinkLink
        icon={icon}
        image={icon ? undefined : image}
        label={name?.value}
        to={href?.value}
        onClick={onClick}
      />
    );
  }, [image, name, href]);

  if (menuItems) {
    return (
      <Menu trigger={menuItemLabel}>
        {({ handleClose, ref }: MenuChildProps) => (
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

  return menuItemLabel(undefined);
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

export default register(MenuItemNavbar);
