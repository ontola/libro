import {
  LinkedResourceContainer, linkType,
  Property,
  register, subjectType,
} from 'link-redux';
import React from 'react';
import FontAwesome from 'react-fontawesome';

import {
  Resource,
  SideBarCollapsible,
} from '../../components';
import SideBarLinkIcon from '../../components/SideBarLink/SideBarLinkIcon';
import { isDifferentOrigin } from '../../helpers/iris';
import { NS } from '../../helpers/LinkedRenderStore';
import { headerTopology } from '../../topologies/Header';

class MenuItemSidebar extends React.PureComponent {
  static type = [
    NS.argu('MenuItem'),
    NS.argu('SubMenu'),
    NS.argu('Menu'),
  ];

  static topology = headerTopology;

  static mapDataToProps = {
    href: NS.argu('href'),
    menuItems: {
      label: NS.argu('menuItems'),
      limit: Infinity,
    },
    name: NS.schema('name'),
  };

  static propTypes = {
    href: linkType,
    menuItems: linkType,
    subject: subjectType,
  };

  render() {
    const { href, menuItems, subject } = this.props;

    const id = `${subject}-menu-items`;
    const icon = href && isDifferentOrigin(href)
      ? <FontAwesome name="external-link" />
      : <Property label={NS.schema('image')} />;

    const MenuItemLabel = (
      <Property
        forceRender
        data-test="MenuItem-MenuItemLabel"
        id={id}
        label={NS.argu('href')}
      >
        <SideBarLinkIcon>
          {icon}
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
            id={id}
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
