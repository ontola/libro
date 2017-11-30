import LinkedRenderStore, { RENDER_CLASS_NAME } from 'link-lib';
import { Property } from 'link-redux';
import React from 'react';

import { NS } from '../../helpers/LinkedRenderStore';

const CreateAction = () => (
  <Property label={NS.schema('target')} />
);
export default [
  LinkedRenderStore.registerRenderer(
    CreateAction,
    NS.schema('CreateAction')
  ),
  LinkedRenderStore.registerRenderer(
    CreateAction,
    NS.schema('CreateAction'),
    RENDER_CLASS_NAME,
    NS.argu('collection')
  ),
];
