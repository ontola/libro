import React from 'react';

import { Image } from '../../../components';
import LinkedRenderStore, { NS } from '../../../helpers/LinkedRenderStore';

LinkedRenderStore.registerRenderer(
  ({ linkedProp }) => <Image className="Detail__image" linkedProp={linkedProp} style={{ maxHeight: 'inherit' }} />,
  NS.schema('ImageObject'),
  NS.schema('thumbnail')
);

LinkedRenderStore.registerRenderer(
  ({ linkedProp }) => <Image className="SideBarLink__image" linkedProp={linkedProp} style={{ maxHeight: 'inherit' }} />,
  NS.schema('ImageObject'),
  NS.schema('thumbnail'),
  NS.argu('sidebar')
);
