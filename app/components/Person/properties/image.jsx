import LinkedRenderStore from 'link-lib';
import { LinkedObjectContainer, PropertyBase } from 'link-redux';
import React from 'react';

import { GeneratedIcon } from 'components';

class Image extends PropertyBase {
  render() {
    // const childObj = this.getLinkedObjectProperty();
    // if (!childObj) {
    //   return null;
    // }
    // const name = this.getLinkedObjectProperty('schema:name');
    // if(name) {
    //   return (
    //     <GeneratedIcon
    //       name={name}
    //     />
    //   );
    // }
    return (
      <LinkedObjectContainer
        object={this.getLinkedObjectProperty()}
        topology="voteBubble"
      />
    );
  }
}

LinkedRenderStore.registerRenderer(
  Image,
  'schema:Person',
  ['http://schema.org/image', 'dbo:thumbnail', 'wdt:P18'],
  'voteBubble'
);

export default Image;
