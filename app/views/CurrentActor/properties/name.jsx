import LinkedRenderStore from 'link-lib';
import React from 'react';

LinkedRenderStore.registerRenderer(
  ({ linkedProp }) => <p>{linkedProp}</p>,
  'argu:CurrentActor',
  'schema:name',
  'sideBar'
);
