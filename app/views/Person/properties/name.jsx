import LinkedRenderStore from 'link-lib';
import React from 'react';

LinkedRenderStore.registerRenderer(
  ({ linkedProp }) => <p>{linkedProp}</p>,
  'schema:Person',
  'schema:name',
  'argu:sidebar'
);
