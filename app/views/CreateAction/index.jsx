import { RENDER_CLASS_NAME } from 'link-lib';
import { Property } from 'link-redux';
import React from 'react';

import LinkedRenderStore, { NS } from '../../helpers/LinkedRenderStore';

const CreateAction = () => (
  <Property label={NS.schema('target')} />
);

LinkedRenderStore.registerRenderer(
  CreateAction,
  NS.schema('CreateAction')
);

LinkedRenderStore.registerRenderer(
  CreateAction,
  NS.schema('CreateAction'),
  RENDER_CLASS_NAME,
  NS.argu('collection')
);

export default CreateAction;
