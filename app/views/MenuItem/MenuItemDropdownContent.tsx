import * as schema from '@ontologies/schema';
import { SomeNode } from 'link-lib';
import {
  FC,
  register,
  useFields,
  useGlobalIds,
  useIds,
  useLiterals,
} from 'link-redux';
import React from 'react';

import DropdownMenuItem from '../../components/DropdownMenu/DropdownMenuItem';
import ontola from '../../ontology/ontola';
import { appMenuTopology, menuTopology } from '../../topologies';

interface MenuItemDropdownContentProps {
  hideIcon?: boolean;
  onClose?: () => void;
  subject: SomeNode;
}

const MenuItemDropdownContent = React.forwardRef<FC, MenuItemDropdownContentProps>(
  (props, ref) => {
    const [action] = useGlobalIds(ontola.action);
    const [href] = useFields(ontola.href);
    const [image] = useIds(schema.image);
    const [menuItems] = useIds(ontola.menuItems);
    const [name] = useLiterals(schema.name);

    return(
      <DropdownMenuItem
        innerRef={ref}
        {...props}
        action={action}
        href={href}
        image={image}
        menuItems={menuItems}
        name={name}
      />
    );
  },
) as unknown as FC;

MenuItemDropdownContent.type = ontola.MenuItem;

MenuItemDropdownContent.topology = [
  appMenuTopology,
  menuTopology,
];

MenuItemDropdownContent.displayName = 'MenuItemDropdownContent';

export default register(MenuItemDropdownContent);
