import React from 'react';
import { LinkedObjectContainer, PropertyBase } from 'link-redux';

import LinkedRenderStore from '../../../helpers/LinkedRenderStore';

class IsPartOf extends PropertyBase {
  render() {
    const childObj = this.getLinkedObjectProperty();
    if (childObj && Object.keys(childObj).length === 0 && childObj.constructor === Object) {
      return <div>parent</div>;
    }
    return (
      <LinkedObjectContainer
        object={childObj}
        property="schema:name"
        topology="parent"
      />
    );
  }
}

LinkedRenderStore.registerRenderer(
  IsPartOf,
  'http://schema.org/CreativeWork',
  'http://schema.org/isPartOf'
);

export default IsPartOf;
