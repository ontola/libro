import LinkedRenderStore from 'link-lib';
import { LinkedObjectContainer } from 'link-redux';
import React from 'react';

LinkedRenderStore.registerRenderer(
  ({ linkedProp }) => <LinkedObjectContainer object={linkedProp} topology="sideBar" />,
  'argu:CurrentActor',
  'schema:image',
  'sideBar'
);
