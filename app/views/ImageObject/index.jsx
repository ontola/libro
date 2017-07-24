import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { Property } from 'link-redux';
import React from 'react';

const ImageObject = () => <Property label="schema:thumbnail" />;

LinkedRenderStore.registerRenderer(
  ImageObject,
  'http://schema.org/ImageObject'
);
LinkedRenderStore.registerRenderer(
  ImageObject,
  'http://schema.org/ImageObject',
  RENDER_CLASS_NAME,
  'argu:detail'
);
LinkedRenderStore.registerRenderer(
  ImageObject,
  'http://schema.org/ImageObject',
  RENDER_CLASS_NAME,
  'argu:voteBubble'
);
LinkedRenderStore.registerRenderer(
  () => (
    <div className="SideBarLink__image-wrapper">
      <Property label="schema:thumbnail" />
    </div>
  ),
  'http://schema.org/ImageObject',
  RENDER_CLASS_NAME,
  'argu:sidebar'
);

export { default as Thumbnail } from './properties/thumbnail';

export default ImageObject;
