import {
  linkType,
  LinkedResourceContainer,
  Property,
  register,
} from 'link-redux';
import React from 'react';

import {
  Dropdown,
  Resource,
} from '../../components';
import { NS } from '../../helpers/LinkedRenderStore';
import { cardFloatTopology } from '../../topologies/Card/CardFloat';
import { dropdownContentTopology } from '../../topologies/DropdownContent';

class MenuItemDropdown extends React.PureComponent {
  static type = [
    NS.argu('MenuItem'),
    NS.argu('MenuSection'),
    NS.argu('SubMenu'),
    NS.argu('Menu'),
  ];

  static topology = cardFloatTopology;

  static mapDataToProps = [NS.argu('menuItems')];

  static propTypes = {
    menuItems: linkType,
  };

  render() {
    const { menuItems } = this.props;

    return (
      <Resource>
        <Dropdown
          lazy
          trigger={<Property label={NS.schema('name')} />}
        >
          {() => <LinkedResourceContainer subject={menuItems} topology={dropdownContentTopology} />}
        </Dropdown>
      </Resource>
    );
  }
}

export default register(MenuItemDropdown);
