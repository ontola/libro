import { Property, RENDER_CLASS_NAME } from 'link-redux';
import React from 'react';

import LinkedRenderStore from '../../helpers/LinkedRenderStore';

import './properties/name';
import './properties/target';

const CreateAction = () => (
  <Property label="schema:target">
    <Property label="schema:name" style={{ display: 'inherit' }} />
  </Property>
);

LinkedRenderStore.registerRenderer(
  CreateAction,
  'schema:CreateAction'
);

LinkedRenderStore.registerRenderer(
  CreateAction,
  'schema:CreateAction',
  RENDER_CLASS_NAME,
  'argu:collection'
);

export default CreateAction;
