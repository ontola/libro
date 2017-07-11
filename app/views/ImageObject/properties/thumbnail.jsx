import React from 'react';

import { Image } from 'components';

import LinkedRenderStore from '../../../helpers/LinkedRenderStore';

LinkedRenderStore.registerRenderer(
  ({ linkedProp }) => <Image className="Detail__image" linkedProp={linkedProp} style={{ maxHeight: 'inherit' }} />,
  'http://schema.org/ImageObject',
  'http://schema.org/thumbnail'
);

LinkedRenderStore.registerRenderer(
  ({ linkedProp }) => <Image className="SideBarLink__image" linkedProp={linkedProp} style={{ maxHeight: 'inherit' }} />,
  'http://schema.org/ImageObject',
  'http://schema.org/thumbnail',
  'sidebar'
);
