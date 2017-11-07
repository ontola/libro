import { getValueOrID } from 'link-lib';
import { LinkedObjectContainer, PropertyBase, linkedPropType } from 'link-redux';
import React from 'react';

import LinkedRenderStore, { NS } from '../../../helpers/LinkedRenderStore';

const propTypes = {
  children: linkedPropType,
  linkedProp: linkedPropType,
};

class menuItems extends PropertyBase {
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

[undefined, NS.argu('sidebar')].forEach((top) => {
  LinkedRenderStore.registerRenderer(
    menuItems,
    NS.argu('NavigationsMenu'),
    NS.argu('menuItems'),
    top
  );
});

export default menuItems;
