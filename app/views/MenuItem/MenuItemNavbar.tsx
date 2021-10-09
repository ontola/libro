import * as schema from '@ontologies/schema';
import {
  Resource,
  register,
  useGlobalIds,
  useProperty,
} from 'link-redux';
import React, { ForwardedRef } from 'react';

import { TriggerButtonProps } from '../../components/DropdownMenu/TriggerButton';
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
  const [image] = useGlobalIds(schema.image);
  const [menuItems] = useProperty(ontola.menuItems);
  const [name] = useProperty(schema.name);

  const icon = (image && isFontAwesomeIRI(image.value))
    ? normalizeFontAwesomeIRI(image)
    : undefined;

  const menuItemTrigger = React.useCallback(
    ({
      onClick,
      anchorRef,
      id,
      open,
    }: TriggerButtonProps) => (
      <NavbarLinkLink
        aria-controls={id}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        icon={icon}
        image={icon ? undefined : image}
        label={name?.value}
        ref={anchorRef}
        onClick={onClick}
      />
    ), [image, name, href]);

  if (menuItems) {
    return (
      <Menu trigger={menuItemTrigger}>
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

  return (
    <NavbarLinkLink
      icon={icon}
      image={icon ? undefined : image}
      label={name?.value}
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
