import {
  LinkedResourceContainer, linkType,
  Property,
  register, subjectType,
} from 'link-redux';
import React from 'react';

import {
  Resource,
  SideBarCollapsible,
} from '../../components';
import SideBarLinkIcon from '../../components/SideBarLink/SideBarLinkIcon';
import { NS } from '../../helpers/LinkedRenderStore';
import { sidebarTopology } from '../../topologies/Sidebar';

class MenuItemSidebar extends React.PureComponent {
  static type = [
    NS.argu('MenuItem'),
    NS.argu('SubMenu'),
    NS.argu('Menu'),
  ];

  static topology = sidebarTopology;

  static mapDataToProps = {
    menuItems: {
      label: NS.argu('menuItems'),
      limit: Infinity,
    },
    name: NS.schema('name'),
  };

  static propTypes = {
    menuItems: linkType,
    subject: subjectType,
  };

  render() {
    const { menuItems, subject } = this.props;

    const MenuItemLabel = (
      <Property forceRender data-test="MenuItem-MenuItemLabel" label={NS.argu('href')}>
        <SideBarLinkIcon>
          <Property label={NS.schema('image')} />
        </SideBarLinkIcon>
        <Property label={NS.schema('name')} />
      </Property>
    );

    if (menuItems.length === 0) {
      return <Resource>{MenuItemLabel}</Resource>;
    }

    const items = menuItems
      .map(item => (
        <LinkedResourceContainer
          key={`menu-${item.value}`}
          subject={item}
        />
      ));

    if (items) {
      return (
        <Resource>
          <SideBarCollapsible
            data-test="MenuItem-menuItems-collapsible"
            id={`${subject}-menu-items`}
            labelComp={MenuItemLabel}
          >
            {items}
          </SideBarCollapsible>
        </Resource>
      );
    }

    return MenuItemLabel;
  }
}

export default register(MenuItemSidebar);
