import { RENDER_CLASS_NAME } from 'link-lib';
import { Property } from 'link-redux';
import React from 'react';

import LinkedRenderStore, { NS } from '../../helpers/LinkedRenderStore';

const CurrentActor = () => (
  <Property label={NS.argu('actor')} />
);

LinkedRenderStore.registerRenderer(
  CurrentActor,
  NS.argu('UserActor'),
  RENDER_CLASS_NAME,
  NS.argu('sidebar')
);
