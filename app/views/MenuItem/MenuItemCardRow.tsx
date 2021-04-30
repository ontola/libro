import { Literal, NamedNode } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import { FC, register } from 'link-redux';
import React from 'react';

import Link, { IsActiveCheck } from '../../components/Link';
import ontola from '../../ontology/ontola';
import { cardRowTopology } from '../../topologies/Card/CardRow';

import { MenuTypes } from './types';

interface MenuItemCardRowProps {
  href: NamedNode;
  isActive: IsActiveCheck;
  name?: Literal;
  onClick: () => void;
}

const MenuItemCardRow: FC<MenuItemCardRowProps> = ({
  isActive,
  href,
  name,
  onClick,
}) => (
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

MenuItemCardRow.type = MenuTypes;

MenuItemCardRow.topology = cardRowTopology;

MenuItemCardRow.mapDataToProps = {
  href: ontola.href,
  name: schema.name,
};

export default register(MenuItemCardRow);
