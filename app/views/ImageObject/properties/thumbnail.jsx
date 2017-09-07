import React from 'react';

import { Image } from '../../../components';
import LinkedRenderStore, { linkedPropVal, NS } from '../../../helpers/LinkedRenderStore';

const propTypes = {
  linkedProp: linkedPropVal
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

[undefined, NS.argu('sidebar'), NS.argu('voteBubble'), NS.argu('detail')].forEach((t) => {
  LinkedRenderStore.registerRenderer(
    ImageObjectThumbnailTop,
    NS.schema('ImageObject'),
    NS.schema('thumbnail'),
    t
  );
});
