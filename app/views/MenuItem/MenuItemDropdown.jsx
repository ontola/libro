import IconButton from '@material-ui/core/IconButton';
import {
  LinkedResourceContainer,
  Property,
  linkType,
  register,
} from 'link-redux';
import React from 'react';

import DropdownMenu from '../../components/DropdownMenu';
import { NS } from '../../helpers/LinkedRenderStore';
import { cardFloatTopology } from '../../topologies/Card/CardFloat';
import { containerFloatTopology } from '../../topologies/Container/ContainerFloat';

const MenuItemDropdown = (props) => {
  const {
    menuItems,
  } = props;

  const trigger = onClick => (
    <IconButton
      centerRipple
      color="default"
      size="small"
      onClick={onClick}
    >
      <Property label={NS.schema('name')} />
    </IconButton>
  );

  return (
    <DropdownMenu
      trigger={trigger}
    >
      <LinkedResourceContainer subject={menuItems} />
    </DropdownMenu>
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
