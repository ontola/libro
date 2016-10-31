import React from 'react';
import { LinkedObjectContainer, PropertyBase } from 'link-redux';

import LinkedRenderStore from '../../../helpers/LinkedRenderStore';

class Image extends PropertyBase {
  render() {
    const childObj = this.getLinkedObjectProperty();
    if (!childObj) {
      return null;
    } else if (childObj && Object.keys(childObj).length === 0 && childObj.constructor === Object) {
      return <div>image</div>;
    } else if (typeof childObj === 'string') {
      return (
        <img
          role="presentation"
          src={childObj}
          style={{ float: 'right', maxWidth: '10em' }}
        />
      );
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
  Image,
  'http://schema.org/Thing',
  ['http://schema.org/image', 'dbo:thumbnail', 'wdt:P18']
);

export default Image;
