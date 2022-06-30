import * as schema from '@ontologies/schema';
import {
  Resource,
  useFields,
  useIds,
  useStrings,
} from 'link-redux';
import React from 'react';

import { normalizeFontAwesomeIRI } from '../../../Common/lib/iris';
import ontola from '../../../Core/ontology/ontola';
import { NavbarLinkLink } from '../../../NavBar/components/NavbarLink';
import Menu from '../../topologies/Menu';
import { MenuChildProps } from '../DropdownMenu/DropdownMenu';
import { TriggerButtonProps } from '../DropdownMenu/TriggerButton';

const LinkedMenuTrigger = (): JSX.Element | null => {
  const [menuItems] = useIds(ontola.menuItems);
  const [href] = useFields(ontola.href);
  const [name] = useStrings(schema.name);
  const [image] = useIds(schema.image);
  const icon = image ? normalizeFontAwesomeIRI(image) : undefined;

  if (!menuItems) {
    return null;
  }

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
        label={name}
        ref={anchorRef}
        title={name}
        onClick={onClick}
      />
    ), [image, name, href]);

  return (
    <Menu
      title={name}
      trigger={menuItemTrigger}
    >
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
};

export default LinkedMenuTrigger;
