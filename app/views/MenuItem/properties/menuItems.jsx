import {
  LinkedResourceContainer,
  PropertyBase,
  linkedPropType,
  linkType,
  register,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';
import { SideBarCollapsible } from '../../../components';
import { dropdownContentTopology } from '../../../topologies/DropdownContent';
import { sidebarTopology } from '../../../topologies/Sidebar';

class MenuItems extends PropertyBase {
  static type = [
    NS.argu('MenuItem'),
    NS.argu('SubMenu'),
    NS.argu('MenuSection'),
  ];

  static property = NS.argu('menuItems');

  static topology = [
    sidebarTopology,
    dropdownContentTopology,
  ];

  static propTypes = {
    children: linkType,
    labelComp: PropTypes.node,
    linkedProp: linkedPropType,
  };

  render() {
    const rawProp = this.getLinkedObjectPropertyRaw();
    if (rawProp.length === 0) {
      return this.props.labelComp;
    }

    const items = rawProp
      .map(item => (
        <LinkedResourceContainer
          key={`menu-${item.object}`}
          subject={item.object}
        />
      ));

    if (!this.props.labelComp) {
      return items;
    }

    if (items) {
      return (
        <SideBarCollapsible
          data-test="MenuItem-menuItems-collapsible"
          id={`${this.props.subject}-menu-items`}
          labelComp={this.props.labelComp}
        >
          {items}
        </SideBarCollapsible>
      );
    }

    return this.props.labelComp;
  }
}

export default register(MenuItems);
