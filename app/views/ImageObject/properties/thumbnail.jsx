import { linkedPropType } from 'link-redux';
import React from 'react';

import { Image } from '../../../components';
import LinkedRenderStore, { NS } from '../../../helpers/LinkedRenderStore';

const propTypes = {
  linkedProp: linkedPropType,
};

const ImageObjectThumbnail = ({ linkedProp }) => (
  <Image
    className="Detail__image"
    linkedProp={linkedProp}
    style={{ maxHeight: 'inherit' }}
  />
);

ImageObjectThumbnail.propTypes = propTypes;

LinkedRenderStore.registerRenderer(
  ImageObjectThumbnail,
  NS.schema('ImageObject'),
  NS.schema('thumbnail')
);

const ImageObjectThumbnailTop = ({ linkedProp }) => (
  <Image
    className="SideBarLink__image"
    linkedProp={linkedProp}
    style={{ maxHeight: 'inherit' }}
  />
);

ImageObjectThumbnailTop.propTypes = propTypes;

[
  undefined,
  NS.argu('collection'),
  NS.argu('detail'),
  NS.argu('sidebar'),
  NS.argu('voteBubble'),
  NS.argu('sidebarBlock')
].forEach((t) => {
  LinkedRenderStore.registerRenderer(
    ImageObjectThumbnailTop,
    NS.schema('ImageObject'),
    NS.schema('thumbnail'),
    t
  );
});
