import { linkedPropType } from 'link-redux';
import React from 'react';

import { Image } from '../../../components';
import LinkedRenderStore, { NS } from '../../../helpers/LinkedRenderStore';
import SideBarLinkImage from '../../../components/SideBarLink/SideBarLinkImage';

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
    imageUrl={linkedProp}
    linkedProp={linkedProp}
    override={SideBarLinkImage}
    style={{ height: '100%' }}
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
