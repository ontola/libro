import LinkedRenderStore, { getValueOrID } from 'link-lib';
import { LinkedObjectContainer, PropertyBase, linkedPropType } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';
import { SideBarCollapsible } from '../../../components';

const propTypes = {
  children: linkedPropType,
  labelComp: PropTypes.node,
  linkedProp: linkedPropType,
};

class menuItems extends PropertyBase {
  render() {
    const rawProp = this.getLinkedObjectPropertyRaw();
    if (!rawProp) {
      return this.props.labelComp;
    }

    const items = rawProp
      .map(getValueOrID)
      .map(url => (
        <LinkedObjectContainer
          key={`menu-${url}`}
          object={url}
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
  [NS.argu('MenuItem'), NS.argu('SubMenu'), NS.argu('NavigationsMenu'), NS.argu('MenuSection')],
  NS.argu('menuItems'),
  [undefined, NS.argu('sidebar'), NS.argu('sidebarBlock')]
);
