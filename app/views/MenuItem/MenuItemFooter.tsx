import { Literal } from '@ontologies/core';
import * as schema from '@ontologies/schema';
import { SomeNode } from 'link-lib';
import {
  FC,
  Property,
  Resource,
  register,
} from 'link-redux';
import React from 'react';

import { NavbarLinkLink } from '../../components/NavbarLink';
import ResourceBoundary from '../../components/ResourceBoundary';
import argu from '../../ontology/argu';
import ontola from '../../ontology/ontola';
import { footerTopology } from '../../topologies/Footer';

interface MenuItemFooterProps {
  image?: SomeNode;
  menuItems?: SomeNode;
  name?: Literal;
  nested?: boolean;
  onClick?: () => void;
}
interface MenuItemLabelProps extends MenuItemFooterProps {
  id: string;
}

const MenuItemFooterLabel = ({
  id,
  image,
  name,
  nested,
  onClick,
}: MenuItemLabelProps): JSX.Element | null => {
  if (!name && !image) {
    return null;
  }

  return (
    <Property
      forceRender
      component={NavbarLinkLink}
      data-test="MenuItem-MenuItemLabel"
      handleClick={onClick}
      id={id}
      label={ontola.href}
    >
      <Property label={schema.image} />
      <Property label={schema.name} nested={nested} />
    </Property>
  );
};

const MenuItemFooter: FC<MenuItemFooterProps> = (props) => {
  const {
    menuItems,
    subject,
  } = props;
  const id = `${subject}-menu-items`;

  return (
    <ResourceBoundary>
      <MenuItemFooterLabel {...props} id={id} />
      {menuItems && <Resource childProps={{ nested: true }} subject={menuItems} />}
    </ResourceBoundary>
  );
};

MenuItemFooter.type = [
  ontola.MenuItem,
  argu.SubMenu,
  argu.Menu,
];

MenuItemFooter.topology = footerTopology;

MenuItemFooter.mapDataToProps = {
  image: schema.image,
  menuItems: ontola.menuItems,
  name: schema.name,
};

export default register(MenuItemFooter);
