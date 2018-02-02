import LinkedRenderStore from 'link-lib';
import { LinkedResourceContainer, PropertyBase, linkedPropType } from 'link-redux';
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
      .map(item => (
        <LinkedResourceContainer
          key={`menu-${item.object}`}
          subject={item.object}
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
