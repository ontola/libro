import React from 'react';
import { LinkedObjectContainer, PropertyBase } from 'link-redux';

import LinkedRenderStore from '../../../helpers/LinkedRenderStore';

class Creator extends PropertyBase {
  render() {
    const childObj = this.getLinkedObjectProperty();
    if (typeof childObj === 'undefined') {
      return <span />;
    }
    return (
      <LinkedObjectContainer
        object={childObj}
        topology="detail"
      />
    );
  }
}

LinkedRenderStore.registerRenderer(
  Creator,
  'http://schema.org/CreativeWork',
  'http://schema.org/creator'
);

export default Creator;
