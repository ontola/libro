import * as schema from '@ontologies/schema';
import {
  FC,
  register,
  useProperty,
} from 'link-redux';
import React from 'react';

import Link, { IsActiveCheck } from '../../../Common/components/Link';
import { cardRowTopology } from '../../../Common/topologies/Card/CardRow';
import ontola from '../../../Kernel/ontology/ontola';

import { MenuTypes } from './types';

interface MenuItemCardRowProps {
  isActive: IsActiveCheck;
  onClick: () => void;
}

const MenuItemCardRow: FC<MenuItemCardRowProps> = ({
  isActive,
  onClick,
}) => {
  const [href] = useProperty(ontola.href);
  const [name] = useProperty(schema.name);

  return (
    <li>
      <Link
        isActive={isActive}
        to={href.value}
        onClick={onClick}
      >
        {name?.value}
      </Link>
    </li>
  );
};

MenuItemCardRow.type = MenuTypes;

MenuItemCardRow.topology = cardRowTopology;

export default register(MenuItemCardRow);
