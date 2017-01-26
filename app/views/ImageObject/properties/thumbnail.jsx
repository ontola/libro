import React from 'react';

import LinkedRenderStore, { linkedPropVal } from '../../../helpers/LinkedRenderStore';

const propTypes = {
  linkedProp: linkedPropVal,
};

const Thumbnail = ({ linkedProp }) => (
  <img
    className="Detail__image"
    role="presentation"
    src={linkedProp}
  />
);

Thumbnail.propTypes = propTypes;

LinkedRenderStore.registerRenderer(
  Thumbnail,
  'http://schema.org/ImageObject',
  'http://schema.org/thumbnail'
);

export default Thumbnail;
