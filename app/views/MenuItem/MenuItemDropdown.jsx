import IconButton from '@material-ui/core/IconButton';
import {
  LinkedResourceContainer,
  Property,
  linkType,
  register,
} from 'link-redux';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';
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
      <Property label={NS.schema('image')} />
    </IconButton>
  );

  return (
    <Menu
      trigger={trigger}
    >
      <LinkedResourceContainer subject={menuItems} />
    </Menu>
  );
};

MenuItemDropdown.type = [
  NS.ontola('MenuItem'),
  NS.argu('MenuSection'),
  NS.argu('SubMenu'),
  NS.argu('Menu'),
];

MenuItemDropdown.topology = [cardFloatTopology, containerFloatTopology];

MenuItemDropdown.mapDataToProps = [NS.ontola('menuItems')];

MenuItemDropdown.propTypes = {
  menuItems: linkType,
};

export default register(MenuItemDropdown);
