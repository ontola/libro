import LinkedRenderStore from 'link-lib';
import {
  LinkedResourceContainer,
  PropertyBase,
  linkedPropType,
  linkType,
} from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';
import { SideBarCollapsible } from '../../../components';
import { dropdownContentTopology } from '../../../topologies/DropdownContent';
import { sidebarTopology } from '../../../topologies/Sidebar';

const propTypes = {
  children: linkType,
  labelComp: PropTypes.node,
  linkedProp: linkedPropType,
};

class menuItems extends PropertyBase {
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

menuItems.propTypes = propTypes;

export default LinkedRenderStore.registerRenderer(
  menuItems,
  [NS.argu('MenuItem'), NS.argu('SubMenu'), NS.argu('MenuSection')],
  NS.argu('menuItems'),
  [sidebarTopology, dropdownContentTopology]
);
