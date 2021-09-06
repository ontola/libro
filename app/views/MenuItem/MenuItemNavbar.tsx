import { NamedNode } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import {
  Resource,
  register,
  useProperty,
} from 'link-redux';
import React, { ForwardedRef } from 'react';

import { NavbarLinkLink } from '../../components/NavbarLink';
import { isFontAwesomeIRI, normalizeFontAwesomeIRI } from '../../helpers/iris';
import argu from '../../ontology/argu';
import ontola from '../../ontology/ontola';
import Menu from '../../topologies/Menu';
import { navbarTopology } from '../../topologies/Navbar';

interface MenuChildProps {
  handleClose: () => void;
  ref: ForwardedRef<unknown>;
}

const MenuItemNavbar = () => {
  const [href] = useProperty(ontola.href);
  const [image] = useProperty(schema.image) as NamedNode[];
  const [menuItems] = useProperty(ontola.menuItems);
  const [name] = useProperty(schema.name);

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

export default register(MenuItemNavbar);
