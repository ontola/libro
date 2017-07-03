import React from 'react';
import { getValueOrID } from 'link-lib';
import { LinkedObjectContainer, PropertyBase } from 'link-redux';

import LinkedRenderStore, { linkedPropVal } from '../../../helpers/LinkedRenderStore';

const propTypes = {
  children: linkedPropVal,
  linkedProp: linkedPropVal,
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

LinkedRenderStore.registerRenderer(
  menuItems,
  'argu:NavigationsMenu',
  'argu:menuItems'
);

export default menuItems;
