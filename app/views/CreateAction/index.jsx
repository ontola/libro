import { RENDER_CLASS_NAME } from 'link-lib';
import { Property } from 'link-redux';
import React from 'react';

import LinkedRenderStore, { NS } from '../../helpers/LinkedRenderStore';

import './properties/name';
import './properties/target';

const CreateAction = () => (
  <Property label={NS.schema('target')}>
    <Property label={NS.schema('name')} style={{ display: 'inherit' }} />
  </Property>
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
