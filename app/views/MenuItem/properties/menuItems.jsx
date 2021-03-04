import {
  Resource,
  ReturnType,
  linkType,
  register,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import argu from '../../../ontology/argu';
import ontola from '../../../ontology/ontola';
import { menuTopology } from '../../../topologies/Menu';
import { navbarTopology } from '../../../topologies/Navbar';

const MenuItems = ({
  childProps,
  labelComp,
  menuItems,
}) => {
  const rawProp = menuItems;
  if (rawProp.length === 0) {
    return labelComp;
  }

  return rawProp
    .map((item) => (
      <Resource
        childProps={childProps}
        key={`menu-${item}`}
        subject={item}
      />
    ));
};

MenuItems.type = [
  ontola.MenuItem,
  argu.SubMenu,
  argu.MenuSection,
];

MenuItems.property = ontola.menuItems;

MenuItems.topology = [
  navbarTopology,
  menuTopology,
];

MenuItems.mapDataToProps = {
  menuItems: {
    label: ontola.menuItems,
    returnType: ReturnType.AllTerms,
  },
};

MenuItems.propTypes = {
  childProps: PropTypes.objectOf(PropTypes.any),
  labelComp: PropTypes.node,
  menuItems: linkType,
};

MenuItems.defaultProps = {
  childprops: {},
};

export default register(MenuItems);
