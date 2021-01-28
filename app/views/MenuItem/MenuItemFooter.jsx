import * as schema from '@ontologies/schema';
import {
  Property,
  Resource,
  linkType,
  register,
  subjectType,
} from 'link-redux';
import React from 'react';
import PropTypes from 'prop-types';

import { NavbarLinkLink } from '../../components/NavbarLink';
import ResourceBoundary from '../../components/ResourceBoundary';
import argu from '../../ontology/argu';
import ontola from '../../ontology/ontola';
import { footerTopology } from '../../topologies/Footer';

const MenuItemFooter = ({
  image,
  menuItems,
  name,
  nested,
  subject,
}) => {
  const id = `${subject}-menu-items`;

  const menuItemLabel = (onClick) => {
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

  return (
    <ResourceBoundary>
      {menuItemLabel()}
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

MenuItemFooter.propTypes = {
  image: linkType,
  menuItems: linkType,
  name: linkType,
  nested: PropTypes.bool,
  subject: subjectType,
};

export default register(MenuItemFooter);
