import React from 'react';

import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { Property } from 'link-redux';

const ImageObject = () => <Property label="schema:thumbnail" />;

LinkedRenderStore.registerRenderer(
  ImageObject,
  'http://schema.org/ImageObject',
  RENDER_CLASS_NAME,
  'detail'
);
LinkedRenderStore.registerRenderer(
  ImageObject,
  'http://schema.org/ImageObject',
  RENDER_CLASS_NAME,
  'voteBubble'
);

export { default as Thumbnail } from './properties/thumbnail';

export default ImageObject;
