import React from 'react';
import { PropertyBase } from 'link-redux';

import LinkedRenderStore from '../../../helpers/LinkedRenderStore';

class Thumbnail extends PropertyBase {
  render() {
    return (
      <img
        className="Detail__image"
        role="presentation"
        src={this.getLinkedObjectProperty()}
      />
    );
  }
}

LinkedRenderStore.registerRenderer(
  Thumbnail,
  'http://schema.org/ImageObject',
  'http://schema.org/thumbnail'
);

export default Thumbnail;
