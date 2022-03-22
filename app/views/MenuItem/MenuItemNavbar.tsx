import * as schema from '@ontologies/schema';
import {
  register,
  useIds,
  useProperty,
} from 'link-redux';
import React from 'react';

import LinkedMenuTrigger from '../../components/Menu/LinkedMenuTrigger';
import { NavbarLinkLink } from '../../components/NavbarLink';
import { isFontAwesomeIRI, normalizeFontAwesomeIRI } from '../../helpers/iris';
import argu from '../../ontology/argu';
import ontola from '../../ontology/ontola';
import { navbarTopology } from '../../topologies/Navbar';

interface MenuItemNavbarProps {
  menuItemRef: React.ForwardedRef<HTMLButtonElement>,
}

const MenuItemNavbar = ({ menuItemRef }: MenuItemNavbarProps) => {
  const [href] = useProperty(ontola.href);
  const [image] = useIds(schema.image);
  const [menuItems] = useProperty(ontola.menuItems);
  const [name] = useProperty(schema.name);

  const icon = (image && isFontAwesomeIRI(image.value))
    ? normalizeFontAwesomeIRI(image)
    : undefined;

  if (menuItems) {
    return <LinkedMenuTrigger />;
  }

  return (
    <NavbarLinkLink
      icon={icon}
      image={icon ? undefined : image}
      label={name?.value}
      ref={menuItemRef}
      title={name.value}
      to={href?.value}
    />
  );
};

MenuItemNavbar.type = [
  ontola.MenuItem,
  argu.SubMenu,
  argu.Menu,
];

MenuItemNavbar.topology = navbarTopology;

export default register(MenuItemNavbar);
