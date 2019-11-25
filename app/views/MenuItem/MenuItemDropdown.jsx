import IconButton from '@material-ui/core/IconButton';
import schema from '@ontologies/schema';
import {
  LinkedResourceContainer,
  Property,
  linkType,
  register,
} from 'link-redux';
import React from 'react';

import Resource from '../../components/Resource';
import { NS } from '../../helpers/LinkedRenderStore';
import ontola from '../../ontology/ontola';
import { cardFloatTopology } from '../../topologies/Card/CardFloat';
import { containerFloatTopology } from '../../topologies/Container/ContainerFloat';
import Menu from '../../topologies/Menu';

const MenuItemDropdown = ({
  menuItems,
}) => {
  const trigger = onClick => (
    <IconButton
      centerRipple
      color="default"
      size="small"
      onClick={onClick}
    >
      <Property label={schema.image} />
    </IconButton>
  );

  return (
    <Resource>
      <Menu
        trigger={trigger}
      >
        <LinkedResourceContainer subject={menuItems} />
      </Menu>
    </Resource>
  );
};

MenuItemDropdown.type = [
  ontola.MenuItem,
  NS.argu('MenuSection'),
  NS.argu('SubMenu'),
  NS.argu('Menu'),
];

MenuItemDropdown.topology = [cardFloatTopology, containerFloatTopology];

MenuItemDropdown.mapDataToProps = {
  menuItems: ontola.menuItems,
};

MenuItemDropdown.propTypes = {
  menuItems: linkType,
};

export default register(MenuItemDropdown);
