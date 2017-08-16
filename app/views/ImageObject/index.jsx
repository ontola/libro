import { RENDER_CLASS_NAME } from 'link-lib';
import { Property } from 'link-redux';
import React from 'react';

import LinkedRenderStore, { NS } from '../../helpers/LinkedRenderStore';


const ImageObject = () => <Property label={NS.schema('thumbnail')} />;

LinkedRenderStore.registerRenderer(
  ImageObject,
  NS.schema('ImageObject')
);
LinkedRenderStore.registerRenderer(
  ImageObject,
  NS.schema('ImageObject'),
  RENDER_CLASS_NAME,
  NS.argu('detail')
);
LinkedRenderStore.registerRenderer(
  ImageObject,
  NS.schema('ImageObject'),
  RENDER_CLASS_NAME,
  NS.argu('voteBubble')
);
LinkedRenderStore.registerRenderer(
  () => (
    <div className="SideBarLink__image-wrapper">
      <Property label={NS.schema('thumbnail')} />
    </div>
  ),
  NS.schema('ImageObject'),
  RENDER_CLASS_NAME,
  NS.argu('sidebar')
);

export { default as Thumbnail } from './properties/thumbnail';

export default ImageObject;
