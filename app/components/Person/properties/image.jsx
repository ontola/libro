import LinkedRenderStore from 'link-lib';
import { LinkedObjectContainer, PropertyBase } from 'link-redux';
import React from 'react';

class Image extends PropertyBase {
  render() {
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
  ['schema:Person', 'aod:Persons'],
  ['http://schema.org/image', 'dbo:thumbnail', 'wdt:P18'],
  'detail'
);
LinkedRenderStore.registerRenderer(
  Image,
  ['schema:Person', 'aod:Persons'],
  ['http://schema.org/image', 'dbo:thumbnail', 'wdt:P18'],
  'voteBubble'
);

export default Image;
