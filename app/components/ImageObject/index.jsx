import React from 'react';

import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { Property, PropertyBase } from 'link-redux';

class ImageObject extends PropertyBase {
  render() {
    return (
      <Property label="schema:thumbnail" />
    );
  }
}

LinkedRenderStore.registerRenderer(
  ImageObject,
  'http://schema.org/ImageObject',
  RENDER_CLASS_NAME,
  'detail'
);

export { default as Thumbnail } from './properties/thumbnail';

export default ImageObject;
