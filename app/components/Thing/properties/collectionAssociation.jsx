import React from 'react';
import { LinkedObjectContainer, PropertyBase } from 'link-redux';

import LinkedRenderStore from '../../../helpers/LinkedRenderStore';

class CollectionAssociation extends PropertyBase {
  render() {
    return (
      <LinkedObjectContainer object={this.getLinkedObjectProperty()} />
    );
  }
}

LinkedRenderStore.registerRenderer(
  CollectionAssociation,
  'http://schema.org/Thing',
  [
    'https://argu.co/ns/core#collectionAssociation',
    'argu:topArgumentsPro',
    'argu:topArgumentsCon',
  ]
);

export default CollectionAssociation;
