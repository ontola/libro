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

LinkedRenderStore.registerRenderer(
  ({ linkedProp }) => <img className="SideBarLink__image" role="presentation" src={linkedProp} />,
  'http://schema.org/ImageObject',
  'http://schema.org/thumbnail',
  'sideBar'
);

export default Thumbnail;
