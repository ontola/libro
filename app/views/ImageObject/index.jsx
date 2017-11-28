import { RENDER_CLASS_NAME } from 'link-lib';
import { Property } from 'link-redux';
import React from 'react';

import { SideBarLinkImageWrapper } from '../../components/SideBarLink';
import LinkedRenderStore, { NS } from '../../helpers/LinkedRenderStore';

const ImageObject = () => <Property label={NS.schema('thumbnail')} />;

[
  undefined,
  NS.argu('collection'),
  NS.argu('detail'),
  NS.argu('voteBubble')
].forEach((top) => {
  LinkedRenderStore.registerRenderer(
    ImageObject,
    NS.schema('ImageObject'),
    RENDER_CLASS_NAME,
    top
  );
});

[NS.argu('sidebar'), NS.argu('sidebarBlock')].forEach((top) => {
  LinkedRenderStore.registerRenderer(
    () => (
      <SideBarLinkImageWrapper>
        <Property label={NS.schema('thumbnail')} />
      </SideBarLinkImageWrapper>
    ),
    NS.schema('ImageObject'),
    RENDER_CLASS_NAME,
    top
  );
});

export { default as Thumbnail } from './properties/thumbnail';

export default ImageObject;
