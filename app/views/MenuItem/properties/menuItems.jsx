import {
  Resource,
  linkType,
  register,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';
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
  NS.argu('SubMenu'),
  NS.argu('MenuSection'),
];

MenuItems.property = ontola.menuItems;

MenuItems.topology = [
  navbarTopology,
  menuTopology,
];

MenuItems.mapDataToProps = {
  menuItems: {
    label: ontola.menuItems,
    limit: Infinity,
  },
};

MenuItems.propTypes = {
  childProps: PropTypes.objectOf(PropTypes.any),
  labelComp: PropTypes.node,
  menuItems: linkType,
};

MenuItems.defaultProps = {
  childProps: {},
};

export default register(MenuItems);
