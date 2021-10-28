import * as schema from '@ontologies/schema';
import {
  Resource,
  useFields,
  useIds,
  useStrings,
} from 'link-redux';
import React, { ForwardedRef } from 'react';

import { normalizeFontAwesomeIRI } from '../../helpers/iris';
import ontola from '../../ontology/ontola';
import Menu from '../../topologies/Menu';
import { TriggerButtonProps } from '../DropdownMenu/TriggerButton';
import { NavbarLinkLink } from '../NavbarLink';

interface MenuChildProps {
  handleClose: () => void;
  ref: ForwardedRef<unknown>;
}

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
        onClick={onClick}
      />
    ), [image, name, href]);

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
};

export default LinkedMenuTrigger;
