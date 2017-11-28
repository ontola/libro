import { getValueOrID } from 'link-lib';
import { LinkedObjectContainer, PropertyBase, linkedPropType } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';

import LinkedRenderStore, { NS } from '../../../helpers/LinkedRenderStore';
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

[undefined, NS.argu('sidebar'), NS.argu('sidebarBlock')].forEach((top) => {
  LinkedRenderStore.registerRenderer(
    menuItems,
    NS.argu('MenuItem'),
    NS.argu('menuItems'),
    top
  );
});

export default menuItems;
