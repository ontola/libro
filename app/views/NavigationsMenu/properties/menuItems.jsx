import LinkedRenderStore, { getValueOrID } from 'link-lib';
import { LinkedObjectContainer, PropertyBase, linkedPropType } from 'link-redux';
import React from 'react';

import { NS } from '../../../helpers/LinkedRenderStore';

const propTypes = {
  children: linkedPropType,
  linkedProp: linkedPropType,
};

export class menuItems extends PropertyBase {
  render() {
    const items = this
      .getLinkedObjectPropertyRaw()
      .map(getValueOrID)
      .map(url => (
        <LinkedObjectContainer
          key={`menu-${url}`}
          object={url}
        />
      ));
    return (
      <ul>
        {items}
      </ul>
    );
  }
}

menuItems.propTypes = propTypes;

export default LinkedRenderStore.registerRenderer(
  menuItems,
  NS.argu('SubMenu'),
  NS.argu('menuItems'),
  [undefined, NS.argu('sidebar')]
);
