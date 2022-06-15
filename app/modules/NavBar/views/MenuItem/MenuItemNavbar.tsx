import { Node } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import {
  register,
  useIds,
  useProperty,
} from 'link-redux';
import React from 'react';

import argu from '../../../Argu/ontology/argu';
import ontola from '../../../../ontology/ontola';
import { navbarTopology } from '../../../../topologies';
import { AddItemCallback } from '../../../Common/hooks/usePriorityNavigation';
import { isFontAwesomeIRI, normalizeFontAwesomeIRI } from '../../../Common/lib/iris';
import LinkedMenuTrigger from '../../../Menu/components/Menu/LinkedMenuTrigger';
import { NavbarLinkLink } from '../../components/NavbarLink';

interface MenuItemNavbarProps {
  subject: Node,
  addObservedItem?: AddItemCallback,
}

const MenuItemNavbar = ({ subject, addObservedItem }: MenuItemNavbarProps) => {
  const [href] = useProperty(ontola.href);
  const [image] = useIds(schema.image);
  const [menuItems] = useProperty(ontola.menuItems);
  const [name] = useProperty(schema.name);

  const setRef = React.useCallback((ref) => {
    if (addObservedItem) {
      addObservedItem(subject, ref);
    }
  }, []);

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
      ref={setRef}
      title={name?.value}
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
